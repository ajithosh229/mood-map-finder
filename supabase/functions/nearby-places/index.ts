import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// LocationIQ tags mapped to moods
const moodTags: Record<string, string> = {
  work: "cafe",
  date: "restaurant",
  relax: "cafe",
  "quick-bite": "fast_food",
  budget: "restaurant",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOCATIONIQ_API_KEY = Deno.env.get("LOCATIONIQ_API_KEY");
    if (!LOCATIONIQ_API_KEY) {
      throw new Error("LOCATIONIQ_API_KEY is not configured");
    }

    const { lat, lng, mood, budget, radius = 2000 } = await req.json();

    if (!lat || !lng || !mood) {
      throw new Error("lat, lng, and mood are required");
    }

    const tag = moodTags[mood] || "restaurant";

    const params = new URLSearchParams({
      key: LOCATIONIQ_API_KEY,
      lat: String(lat),
      lon: String(lng),
      tag,
      radius: String(radius),
      format: "json",
      limit: "12",
    });

    const url = `https://us1.locationiq.com/v1/nearby?${params}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `LocationIQ API error [${response.status}]: ${errorText}`
      );
    }

    const data = await response.json();

    // Transform to our Place format
    const places = (Array.isArray(data) ? data : []).map((poi: any) => {
      const tags: string[] = [];
      if (poi.type) tags.push(poi.type);
      if (poi.class) tags.push(poi.class);

      return {
        name: poi.display_name?.split(",")[0] || poi.name || "Unknown Place",
        category: poi.type || poi.class || "Place",
        rating: 4.0, // LocationIQ doesn't provide ratings
        address: poi.display_name || "Address unavailable",
        priceRange: "$$", // LocationIQ doesn't provide price info
        tags: tags.slice(0, 3),
        lat: parseFloat(poi.lat) || lat,
        lng: parseFloat(poi.lon) || lng,
        distance: poi.distance ? Math.round(parseFloat(poi.distance)) : undefined,
      };
    });

    return new Response(JSON.stringify({ places }), {
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
