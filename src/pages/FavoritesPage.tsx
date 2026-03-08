import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import PlaceCard from "@/components/PlaceCard";
import Navbar from "@/components/Navbar";
import type { Place } from "@/components/PlaceCard";
import { Heart, Loader2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FavoritesPage = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchFavorites();
  }, [user]);

  const fetchFavorites = async () => {
    const { data, error } = await supabase
      .from("favorites")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setFavorites(
        data.map((f) => ({
          name: f.place_name,
          category: f.place_category || "",
          rating: Number(f.place_rating) || 0,
          address: f.place_address || "",
          priceRange: f.place_price_range || "",
          tags: f.place_tags || [],
          lat: f.place_lat || 0,
          lng: f.place_lng || 0,
        }))
      );
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar />
      <div className="pt-20 px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to search
            </button>
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-primary fill-primary" />
              <h1 className="text-3xl font-display text-foreground">Your Favorites</h1>
            </div>
            <p className="text-muted-foreground mt-1">Places you've saved for later</p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : favorites.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favorites.map((place, i) => (
                <PlaceCard key={place.name + i} place={place} index={i} />
              ))}
            </div>
          ) : (
            <div className="glass-strong rounded-2xl p-16 text-center">
              <Heart className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">No favorites yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Search for places and tap the heart to save them here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
