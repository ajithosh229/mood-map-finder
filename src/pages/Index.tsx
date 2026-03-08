import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import MoodSelector from "@/components/MoodSelector";
import ResultsView from "@/components/ResultsView";
import Navbar from "@/components/Navbar";
import StepIndicator from "@/components/StepIndicator";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
"@/components/ui/select";
import { mockPlaces } from "@/data/places";
import { fetchNearbyPlaces } from "@/lib/api";
import { useGeolocation } from "@/hooks/use-geolocation";
import type { Place } from "@/components/PlaceCard";
import { Search, ArrowLeft, ArrowRight, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Step = "hero" | "mood" | "results";

const pageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "60%" : "-60%",
    opacity: 0,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-40%" : "40%",
    opacity: 0,
    scale: 0.97
  })
};

const pageTransition = {
  type: "spring" as const,
  stiffness: 200,
  damping: 30,
  mass: 1
};

const Index = () => {
  const [step, setStep] = useState<Step>("hero");
  const [mood, setMood] = useState<string | null>(null);
  const [distance, setDistance] = useState<string>("2000");
  const [direction, setDirection] = useState(1);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const geo = useGeolocation();

  const goTo = (next: Step, dir: number) => {
    setDirection(dir);
    setStep(next);
  };

  // Request location when entering mood step
  useEffect(() => {
    if (step === "mood" && !geo.lat && !geo.loading && !geo.error) {
      geo.requestLocation();
    }
  }, [step]);

  const handleFindPlaces = async () => {
    if (!mood) return;

    // If we have location, fetch real places
    if (geo.lat && geo.lng) {
      setLoading(true);
      goTo("results", 1);
      try {
        const result = await fetchNearbyPlaces({
          lat: geo.lat,
          lng: geo.lng,
          mood,
          budget: budget || undefined
        });
        setPlaces(result);
        if (result.length === 0) {
          toast.info("No nearby places found. Showing sample results.");
          setPlaces(getFallbackPlaces());
        }
      } catch (err) {
        console.error("Failed to fetch places:", err);
        toast.error("Couldn't fetch nearby places. Showing sample results.");
        setPlaces(getFallbackPlaces());
      } finally {
        setLoading(false);
      }
    } else {
      // Fallback to mock data
      if (geo.error) {
        toast.info("Location unavailable — showing sample results.");
      }
      setPlaces(getFallbackPlaces());
      goTo("results", 1);
    }
  };

  const getFallbackPlaces = (): Place[] => {
    const all = mood ? mockPlaces[mood] || [] : [];
    if (!budget) return all;
    return all.filter((p) => {
      if (budget === "low") return p.priceRange === "$";
      if (budget === "medium") return p.priceRange === "$$";
      if (budget === "high") return p.priceRange === "$$$";
      return true;
    });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden noise-overlay">
      {step !== "hero" &&
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}>
        
          <Navbar />
        </motion.div>
      }

      <AnimatePresence mode="wait" custom={direction}>
        {step === "hero" &&
        <motion.div
          key="hero"
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={pageTransition}
          className="min-h-screen">
          
            <HeroSection onGetStarted={() => goTo("mood", 1)} />
          </motion.div>
        }

        {step === "mood" &&
        <motion.div
          key="mood"
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={pageTransition}
          className="min-h-screen flex flex-col">
          
            <div className="flex-1 flex items-center justify-center px-4 py-20">
              <div className="w-full max-w-3xl">
                <StepIndicator current={1} total={2} />

                <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}>
                
                  <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">Step 1</p>
                  <h2 className="text-4xl sm:text-5xl font-display text-foreground mb-3">
                    What's your <span className="text-gradient italic text-sidebar-primary">mood</span>?
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-md mx-auto">
                    Choose a vibe — we'll find the perfect spot to match.
                  </p>
                </motion.div>

                {/* Location status */}
                <motion.div
                className="flex justify-center mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}>
                
                  {geo.loading ?
                <div className="flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-muted-foreground">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Detecting your location...
                    </div> :
                geo.lat ?
                <div className="flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-accent">
                      <MapPin className="w-3.5 h-3.5" />
                      Location detected — we'll find places near you
                    </div> :
                geo.error ?
                <button
                  onClick={geo.requestLocation}
                  className="flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  
                      <MapPin className="w-3.5 h-3.5" />
                      Enable location for nearby results
                    </button> :
                null}
                </motion.div>

                <MoodSelector selected={mood} onSelect={setMood} />

                <motion.div
                className="mt-12 flex flex-col sm:flex-row items-center gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}>
                
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger className="w-full sm:w-52 bg-card glass-strong rounded-xl h-12">
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">$ — Budget-friendly</SelectItem>
                      <SelectItem value="medium">$$ — Mid-range</SelectItem>
                      <SelectItem value="high">$$$ — Premium</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                  variant="gradient"
                  size="lg"
                  onClick={handleFindPlaces}
                  disabled={!mood}
                  className="rounded-xl px-8 h-12 gap-2 min-w-[180px]">
                  
                    Find Places
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>

                <motion.div
                className="mt-6 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}>
                
                  <button
                  onClick={() => goTo("hero", -1)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                  
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to home
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        }

        {step === "results" &&
        <motion.div
          key="results"
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={pageTransition}
          className="min-h-screen">
          
            <div className="px-4 py-8 sm:py-12">
              <div className="max-w-6xl mx-auto">
                <StepIndicator current={2} total={2} />

                <motion.div
                className="flex items-center justify-between mb-8"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}>
                
                  <div>
                    <p className="text-sm font-medium tracking-widest uppercase text-primary mb-1">Results</p>
                    <h2 className="text-3xl sm:text-4xl font-display text-foreground">
                      Your perfect spots
                    </h2>
                  </div>
                  <button
                  onClick={() => goTo("mood", -1)}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors glass rounded-xl px-4 py-2.5">
                  
                    <ArrowLeft className="w-4 h-4" />
                    Change mood
                  </button>
                </motion.div>

                <ResultsView places={places} mood={mood} loading={loading} />
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

};

export default Index;