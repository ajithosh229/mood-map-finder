import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/hooks/use-theme";
import Navbar from "@/components/Navbar";
import PlaceCard from "@/components/PlaceCard";
import type { Place } from "@/components/PlaceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Heart,
  History,
  Settings,
  ArrowLeft,
  Loader2,
  Trash2,
  Sun,
  Moon,
  Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Tab = "favorites" | "history" | "settings";

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("favorites");
  const [favorites, setFavorites] = useState<Place[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    loadData();
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    const [favRes, histRes, profileRes] = await Promise.all([
      supabase.from("favorites").select("*").order("created_at", { ascending: false }),
      supabase.from("search_history").select("*").order("created_at", { ascending: false }).limit(20),
      supabase.from("profiles").select("*").eq("user_id", user!.id).maybeSingle(),
    ]);

    if (favRes.data) {
      setFavorites(
        favRes.data.map((f) => ({
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

    if (histRes.data) setHistory(histRes.data);
    if (profileRes.data) setDisplayName(profileRes.data.display_name || "");
    setLoading(false);
  };

  const clearHistory = async () => {
    await supabase.from("search_history").delete().eq("user_id", user!.id);
    setHistory([]);
    toast.success("Search history cleared");
  };

  const saveProfile = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName })
      .eq("user_id", user!.id);
    if (error) toast.error("Failed to update profile");
    else toast.success("Profile updated");
    setSaving(false);
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "favorites", label: "Favorites", icon: <Heart className="w-4 h-4" /> },
    { id: "history", label: "History", icon: <History className="w-4 h-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
  ];

  const moodEmoji: Record<string, string> = {
    work: "💼",
    date: "❤️",
    relax: "🧘",
    "quick-bite": "🍔",
    budget: "💰",
    games: "🎮",
  };

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar />
      <div className="pt-20 px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
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

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
                <User className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-display text-foreground">
                  {displayName || user?.email?.split("@")[0] || "Your Profile"}
                </h1>
                <p className="text-muted-foreground text-sm">{user?.email}</p>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-1 bg-secondary/50 rounded-xl p-1 mb-8"
          >
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex-1 justify-center ${
                  tab === t.id
                    ? "bg-card text-foreground shadow-card"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.icon}
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Favorites Tab */}
              {tab === "favorites" && (
                favorites.length > 0 ? (
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
                      Search for places and tap the heart to save them.
                    </p>
                  </div>
                )
              )}

              {/* History Tab */}
              {tab === "history" && (
                <div>
                  {history.length > 0 && (
                    <div className="flex justify-end mb-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearHistory}
                        className="text-destructive hover:text-destructive gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Clear history
                      </Button>
                    </div>
                  )}
                  {history.length > 0 ? (
                    <div className="space-y-2">
                      {history.map((h) => (
                        <div
                          key={h.id}
                          className="flex items-center justify-between bg-card rounded-xl p-4 shadow-card"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{moodEmoji[h.mood] || "📍"}</span>
                            <div>
                              <p className="font-medium text-foreground capitalize">{h.mood}</p>
                              <p className="text-xs text-muted-foreground">
                                {h.budget ? `${h.budget} budget` : "Any budget"}
                                {h.distance ? ` · ${h.distance / 1000} km` : ""}
                                {h.results_count != null ? ` · ${h.results_count} results` : ""}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(h.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="glass-strong rounded-2xl p-16 text-center">
                      <History className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg text-muted-foreground">No search history yet</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your mood searches will appear here.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Settings Tab */}
              {tab === "settings" && (
                <div className="space-y-6 max-w-md">
                  <div className="bg-card rounded-xl p-6 shadow-card space-y-4">
                    <h3 className="font-display text-lg text-foreground">Profile</h3>
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Your name"
                        className="rounded-xl h-11"
                      />
                    </div>
                    <Button
                      variant="gradient"
                      onClick={saveProfile}
                      disabled={saving}
                      className="rounded-xl gap-2"
                    >
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Save Changes
                    </Button>
                  </div>

                  <div className="bg-card rounded-xl p-6 shadow-card">
                    <h3 className="font-display text-lg text-foreground mb-4">Appearance</h3>
                    <button
                      onClick={toggle}
                      className="flex items-center justify-between w-full py-2"
                    >
                      <div className="flex items-center gap-3">
                        {theme === "dark" ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
                        <span className="text-foreground font-medium">
                          {theme === "dark" ? "Dark Mode" : "Light Mode"}
                        </span>
                      </div>
                      <div
                        className={`w-10 h-6 rounded-full transition-colors relative ${
                          theme === "dark" ? "bg-primary" : "bg-secondary"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-primary-foreground absolute top-1 transition-transform ${
                            theme === "dark" ? "translate-x-5" : "translate-x-1"
                          }`}
                        />
                      </div>
                    </button>
                  </div>

                  <div className="bg-card rounded-xl p-6 shadow-card">
                    <h3 className="font-display text-lg text-foreground mb-2">Account</h3>
                    <p className="text-sm text-muted-foreground mb-4">{user?.email}</p>
                    <Button
                      variant="outline"
                      onClick={async () => {
                        await signOut();
                        navigate("/");
                      }}
                      className="rounded-xl text-destructive border-destructive/30 hover:bg-destructive/10"
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
