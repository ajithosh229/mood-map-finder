import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import MoodSelector from "@/components/MoodSelector";
import MapPlaceholder from "@/components/MapPlaceholder";
import PlaceCard from "@/components/PlaceCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockPlaces } from "@/data/places";
import { Search } from "lucide-react";

const Index = () => {
  const [mood, setMood] = useState<string | null>(null);
  const [budget, setBudget] = useState<string>("");
  const [showResults, setShowResults] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = () => {
    if (mood) {
      setShowResults(true);
    }
  };

  const places = mood ? mockPlaces[mood] || [] : [];
  const filteredPlaces = budget
    ? places.filter((p) => {
        if (budget === "low") return p.priceRange === "$";
        if (budget === "medium") return p.priceRange === "$$";
        if (budget === "high") return p.priceRange === "$$$";
        return true;
      })
    : places;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <HeroSection onGetStarted={handleGetStarted} />

      {/* Form Section */}
      <section ref={formRef} className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-display text-foreground mb-2">What's your mood?</h2>
            <p className="text-muted-foreground">Pick a vibe and set your budget</p>
          </motion.div>

          <MoodSelector selected={mood} onSelect={setMood} />

          <motion.div
            className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Select value={budget} onValueChange={setBudget}>
              <SelectTrigger className="w-full sm:w-48 bg-card">
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">$ — Low</SelectItem>
                <SelectItem value="medium">$$ — Medium</SelectItem>
                <SelectItem value="high">$$$ — High</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="gradient"
              size="lg"
              onClick={handleSubmit}
              disabled={!mood}
              className="rounded-full px-8 gap-2"
            >
              <Search className="w-4 h-4" />
              Find Places
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <AnimatePresence>
        {showResults && (
          <motion.section
            key="results"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="pb-20 px-4"
          >
            <div className="max-w-5xl mx-auto">
              <MapPlaceholder />

              <div className="mt-10">
                <h2 className="text-2xl font-display text-foreground mb-6">
                  Recommended for you
                </h2>
                {filteredPlaces.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredPlaces.map((place, i) => (
                      <PlaceCard key={place.name} place={place} index={i} />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No places match that budget. Try adjusting your filters.
                  </p>
                )}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
