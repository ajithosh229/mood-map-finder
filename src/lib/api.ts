import { supabase } from "@/integrations/supabase/client";
import type { Place } from "@/components/PlaceCard";

interface NearbyPlacesParams {
  lat: number;
  lng: number;
  mood: string;
  budget?: string;
  radius?: number;
}

export async function fetchNearbyPlaces(params: NearbyPlacesParams): Promise<Place[]> {
  const { data, error } = await supabase.functions.invoke("nearby-places", {
    body: params,
  });

  if (error) {
    console.error("Edge function error:", error);
    throw new Error(error.message || "Failed to fetch nearby places");
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data?.places || [];
}
