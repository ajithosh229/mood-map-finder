import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="gradient-hero min-h-[70vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />

      <motion.div
        className="text-center max-w-2xl relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.div
          className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Discover your perfect spot</span>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display leading-tight text-foreground mb-4">
          Find the right place for your{" "}
          <span className="text-primary">mood</span> and{" "}
          <span className="text-accent">budget</span>
        </h1>

        <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto font-body">
          Whether it's a cozy date spot or a quick bite, MoodMap matches your vibe to the perfect venue.
        </p>

        <Button variant="gradient" size="lg" onClick={onGetStarted} className="text-base px-10 py-6 rounded-full">
          Get Started
        </Button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
