import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeafletMap from "@/components/LeafletMap";
import PlaceCard from "@/components/PlaceCard";
import PlaceDetailModal from "@/components/PlaceDetailModal";
import type { Place } from "@/components/PlaceCard";
import { Loader2, X } from "lucide-react";

interface ResultsViewProps {
  places: Place[];
  mood: string | null;
  loading?: boolean;
}

const ResultsView = ({ places, mood, loading }: ResultsViewProps) => {
  const [activePlace, setActivePlace] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    places.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [places]);

  const filteredPlaces = useMemo(() => {
    if (selectedTags.length === 0) return places;
    return places.filter((p) =>
      selectedTags.every((tag) => p.tags.includes(tag))
    );
  }, [places, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

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
          places={filteredPlaces}
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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-display text-foreground">Recommended places</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredPlaces.length} {filteredPlaces.length === 1 ? "spot" : "spots"} matched your vibe
            </p>
          </div>
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Clear filters
            </button>
          )}
        </div>

        {/* Tag filters */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`text-xs font-medium rounded-lg px-3 py-1.5 transition-all ${
                  selectedTags.includes(tag)
                    ? "gradient-primary text-primary-foreground shadow-sm"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {filteredPlaces.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPlaces.map((place, i) => (
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
              No places match those filters. Try removing some tags.
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
