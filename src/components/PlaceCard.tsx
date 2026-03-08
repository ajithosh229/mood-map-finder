import { Star, MapPin } from "lucide-react";
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
      transition={{ delay: index * 0.1 }}
      className="bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-elevated transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-display text-lg text-foreground">{place.name}</h3>
          <span className="text-sm text-muted-foreground">{place.category}</span>
        </div>
        <div className="flex items-center gap-1 bg-primary/10 rounded-full px-2.5 py-1">
          <Star className="w-3.5 h-3.5 text-primary fill-primary" />
          <span className="text-sm font-semibold text-primary">{place.rating}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
        <MapPin className="w-3.5 h-3.5" />
        <span>{place.address}</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{place.priceRange}</span>
        <div className="flex gap-1.5 flex-wrap justify-end">
          {place.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-secondary text-secondary-foreground rounded-full px-2.5 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PlaceCard;
