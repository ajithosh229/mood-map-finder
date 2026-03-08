import { useState } from "react";
import { motion } from "framer-motion";
import LeafletMap from "@/components/LeafletMap";
import PlaceCard from "@/components/PlaceCard";
import PlaceDetailModal from "@/components/PlaceDetailModal";
import type { Place } from "@/components/PlaceCard";
import { Loader2 } from "lucide-react";

interface ResultsViewProps {
  places: Place[];
  mood: string | null;
  loading?: boolean;
}

const ResultsView = ({ places, mood, loading }: ResultsViewProps) => {
  const [activePlace, setActivePlace] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground text-lg">Finding places near you...</p>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <LeafletMap
          places={places}
          activePlace={activePlace}
          onPlaceClick={setActivePlace}
        />
      </motion.div>

      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-display text-foreground">Recommended places</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {places.length} {places.length === 1 ? "spot" : "spots"} matched your vibe
            </p>
          </div>
        </div>

        {places.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {places.map((place, i) => (
              <div
                key={place.name + i}
                onMouseEnter={() => setActivePlace(place.name)}
                onMouseLeave={() => setActivePlace(null)}
                onClick={() => setSelectedPlace(place)}
                className="cursor-pointer"
              >
                <PlaceCard place={place} index={i} />
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-strong rounded-2xl p-12 text-center">
            <p className="text-muted-foreground text-lg">
              No places match that budget. Try adjusting your filters.
            </p>
          </div>
        )}
      </motion.div>

      <PlaceDetailModal
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
      />
    </div>
  );
};

export default ResultsView;
