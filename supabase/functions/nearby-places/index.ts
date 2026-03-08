import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Foursquare category IDs mapped to moods
const moodCategories: Record<string, string> = {
  work: "13032,13035", // Coffee shops, coworking
  date: "13065,13003,13025", // Restaurants, bars, Italian
  relax: "13035,13034,18000", // Cafes, tea rooms, spas
  "quick-bite": "13145,13040,13072", // Fast food, burger, pizza
  budget: "13065,13032,13145", // Restaurants, coffee, fast food
};

// Foursquare price mapping
const budgetToPrice: Record<string, number[]> = {
  low: [1],
  medium: [2],
  high: [3, 4],
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const FOURSQUARE_API_KEY = Deno.env.get("FOURSQUARE_API_KEY");
    if (!FOURSQUARE_API_KEY) {
      throw new Error("FOURSQUARE_API_KEY is not configured");
    }

    const { lat, lng, mood, budget, radius = 2000 } = await req.json();

    if (!lat || !lng || !mood) {
      throw new Error("lat, lng, and mood are required");
    }

    const categories = moodCategories[mood] || "13065";

    const params = new URLSearchParams({
      ll: `${lat},${lng}`,
      radius: String(radius),
      categories,
      limit: "12",
      sort: "RELEVANCE",
      fields: "fsq_id,name,categories,location,rating,price,geocodes,distance",
    });

    const url = `https://api.foursquare.com/v3/places/search?${params}`;

    const response = await fetch(url, {
      headers: {
        Authorization: FOURSQUARE_API_KEY,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Foursquare API error [${response.status}]: ${errorText}`
      );
    }

    const data = await response.json();

    // Transform to our Place format
    const places = (data.results || []).map((venue: any) => {
      const priceLevel = venue.price ?? 0;
      const priceRange =
        priceLevel === 1
          ? "$"
          : priceLevel === 2
          ? "$$"
          : priceLevel >= 3
          ? "$$$"
          : "$$";

      const categoryNames = (venue.categories || []).map(
        (c: any) => c.short_name || c.name
      );

      return {
        name: venue.name,
        category: categoryNames[0] || "Place",
        rating: venue.rating ? Math.round(venue.rating) / 2 : 4.0,
        address: venue.location?.formatted_address || venue.location?.address || "Address unavailable",
        priceRange,
        tags: categoryNames.slice(0, 3),
        lat: venue.geocodes?.main?.latitude ?? lat,
        lng: venue.geocodes?.main?.longitude ?? lng,
        distance: venue.distance,
      };
    });

    // Filter by budget if specified
    const filtered = budget
      ? places.filter((p: any) => {
          if (budget === "low") return p.priceRange === "$";
          if (budget === "medium") return p.priceRange === "$$";
          if (budget === "high") return p.priceRange === "$$$";
          return true;
        })
      : places;

    return new Response(JSON.stringify({ places: filtered }), {
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
