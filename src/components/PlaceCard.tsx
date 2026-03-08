import { useState, useEffect } from "react";
import { Star, MapPin, Heart, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export interface Place {
  name: string;
  category: string;
  rating: number;
  address: string;
  priceRange: string;
  tags: string[];
  lat: number;
  lng: number;
  distance?: number;
}

interface PlaceCardProps {
  place: Place;
  index: number;
}

const PlaceCard = ({ place, index }: PlaceCardProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("favorites")
      .select("id")
      .eq("user_id", user.id)
      .eq("place_name", place.name)
      .maybeSingle()
      .then(({ data }) => setIsFav(!!data));
  }, [user, place.name]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast.info("Sign in to save favorites");
      navigate("/auth");
      return;
    }

    setFavLoading(true);
    if (isFav) {
      await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("place_name", place.name);
      setIsFav(false);
      toast.success("Removed from favorites");
    } else {
      await supabase.from("favorites").insert({
        user_id: user.id,
        place_name: place.name,
        place_category: place.category,
        place_rating: place.rating,
        place_address: place.address,
        place_price_range: place.priceRange,
        place_tags: place.tags,
        place_lat: place.lat,
        place_lng: place.lng,
      });
      setIsFav(true);
      toast.success("Saved to favorites");
    }
    setFavLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.06 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-200"
    >
      <div className="h-0.5 gradient-primary" />

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-semibold text-base text-foreground truncate">{place.name}</h3>
            <span className="text-sm text-muted-foreground">{place.category}</span>
          </div>
          <div className="flex items-center gap-2 ml-2 shrink-0">
            <button
              onClick={toggleFavorite}
              disabled={favLoading}
              className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isFav ? "text-primary fill-primary" : "text-muted-foreground hover:text-primary"
                }`}
              />
            </button>
            <div className="flex items-center gap-1 gradient-primary rounded-lg px-2 py-0.5">
              <Star className="w-3 h-3 text-primary-foreground fill-primary-foreground" />
              <span className="text-xs font-semibold text-primary-foreground">{place.rating}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5 min-w-0">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{place.address}</span>
          </div>
          {place.distance != null && (
            <span className="shrink-0 text-xs font-semibold text-primary bg-primary/8 rounded-md px-2 py-0.5">
              {place.distance >= 1000
                ? `${(place.distance / 1000).toFixed(1)} km`
                : `${place.distance} m`}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">{place.priceRange}</span>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors bg-primary/8 rounded-md px-2 py-1"
              onClick={(e) => e.stopPropagation()}
            >
              <Navigation className="w-3 h-3" />
              Directions
            </a>
          </div>
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
