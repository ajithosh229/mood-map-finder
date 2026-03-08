import { Star, MapPin, Navigation, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Place } from "@/components/PlaceCard";

interface PlaceDetailModalProps {
  place: Place | null;
  onClose: () => void;
}

const PlaceDetailModal = ({ place, onClose }: PlaceDetailModalProps) => {
  if (!place) return null;

  return (
    <AnimatePresence>
      {place && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative bg-card rounded-2xl overflow-hidden shadow-elevated w-full max-w-lg max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="relative gradient-primary p-6 pb-5">
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1 bg-white/20 rounded-lg px-2 py-0.5">
                  <Star className="w-3 h-3 text-white fill-white" />
                  <span className="text-xs font-semibold text-white">{place.rating}</span>
                </div>
                <span className="text-xs text-white/80 font-medium">{place.category}</span>
              </div>
              <h2 className="text-2xl font-display font-bold text-white">{place.name}</h2>
            </div>

            {/* Content */}
            <div className="p-5 space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground font-medium">{place.address}</p>
                  {place.distance != null && (
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {place.distance >= 1000
                        ? `${(place.distance / 1000).toFixed(1)} km away`
                        : `${place.distance} m away`}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2 w-fit">
                <span className="text-sm font-semibold text-foreground">{place.priceRange}</span>
                <span className="text-xs text-muted-foreground">
                  {place.priceRange === "$"
                    ? "Budget-friendly"
                    : place.priceRange === "$$"
                    ? "Mid-range"
                    : "Premium"}
                </span>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Features</p>
                <div className="flex flex-wrap gap-2">
                  {place.tags.map((tag) => (
                    <span key={tag} className="text-sm bg-secondary text-secondary-foreground rounded-lg px-3 py-1 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 gradient-primary text-primary-foreground font-semibold rounded-xl py-3 hover:opacity-90 transition-opacity"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + place.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground font-semibold rounded-xl px-5 py-3 hover:bg-secondary/80 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  View on Map
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlaceDetailModal;
