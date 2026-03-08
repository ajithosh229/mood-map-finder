import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// LocationIQ tags mapped to moods — multiple tags per mood for variety
const moodTags: Record<string, string[]> = {
  work: ["cafe", "coworking_space", "library"],
  date: ["restaurant", "bar", "cinema"],
  relax: ["cafe", "park", "spa"],
  "quick-bite": ["fast_food", "food_court", "cafe"],
  budget: ["restaurant", "cafe", "fast_food"],
  games: ["bowling_alley", "amusement_arcade", "sports_centre"],
};

async function fetchTag(
  apiKey: string,
  lat: number,
  lng: number,
  tag: string,
  radius: number
): Promise<any[]> {
  const params = new URLSearchParams({
    key: apiKey,
    lat: String(lat),
    lon: String(lng),
    tag,
    radius: String(radius),
    format: "json",
    limit: "6",
  });

  const response = await fetch(
    `https://us1.locationiq.com/v1/nearby?${params}`
  );

  // 404 means no results for this tag
  if (response.status === 404) {
    await response.text(); // consume body
    return [];
  }

  if (!response.ok) {
    await response.text(); // consume body
    return [];
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOCATIONIQ_API_KEY = Deno.env.get("LOCATIONIQ_API_KEY");
    if (!LOCATIONIQ_API_KEY) {
      throw new Error("LOCATIONIQ_API_KEY is not configured");
    }

    const { lat, lng, mood, radius = 2000 } = await req.json();

    if (!lat || !lng || !mood) {
      throw new Error("lat, lng, and mood are required");
    }

    const tags = moodTags[mood] || ["restaurant"];

    // Fetch all tags in parallel
    const results = await Promise.all(
      tags.map((tag) => fetchTag(LOCATIONIQ_API_KEY, lat, lng, tag, radius))
    );

    // Merge and deduplicate by name
    const seen = new Set<string>();
    const places: any[] = [];

    for (const pois of results) {
      for (const poi of pois) {
        const name =
          poi.display_name?.split(",")[0] || poi.name || "Unknown Place";
        if (seen.has(name)) continue;
        seen.add(name);

        const poiTags: string[] = [];
        if (poi.type) poiTags.push(poi.type);
        if (poi.class) poiTags.push(poi.class);

        places.push({
          name,
          category: poi.type || poi.class || "Place",
          rating: 4.0,
          address: poi.display_name || "Address unavailable",
          priceRange: "$$",
          tags: poiTags.slice(0, 3),
          lat: parseFloat(poi.lat) || lat,
          lng: parseFloat(poi.lon) || lng,
          distance: poi.distance
            ? Math.round(parseFloat(poi.distance))
            : undefined,
        });
      }
    }

    // Sort by distance
    places.sort((a, b) => (a.distance ?? 9999) - (b.distance ?? 9999));

    return new Response(JSON.stringify({ places: places.slice(0, 12) }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error in nearby-places:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
