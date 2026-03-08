import { Star, MapPin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export interface Place {
  name: string;
  category: string;
  rating: number;
  address: string;
  priceRange: string;
  tags: string[];
}

interface PlaceCardProps {
  place: Place;
  index: number;
}

const PlaceCard = ({ place, index }: PlaceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300"
    >
      {/* Color accent bar */}
      <div className="h-1 gradient-primary" />

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg text-foreground truncate">{place.name}</h3>
            <span className="text-sm text-muted-foreground">{place.category}</span>
          </div>
          <div className="flex items-center gap-1 gradient-primary rounded-lg px-2.5 py-1 ml-2 shrink-0">
            <Star className="w-3 h-3 text-primary-foreground fill-primary-foreground" />
            <span className="text-xs font-bold text-primary-foreground">{place.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{place.address}</span>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-3">
          <span className="text-sm font-semibold text-foreground">{place.priceRange}</span>
          <div className="flex gap-1.5 flex-wrap justify-end">
            {place.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] bg-secondary text-secondary-foreground rounded-md px-2 py-0.5 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaceCard;
