import { motion } from "framer-motion";
import { MapPin, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroIllustration from "@/assets/hero-illustration.jpg";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroIllustration}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-[10%] w-80 h-80 rounded-full bg-primary/8 blur-[100px]" />
      <div className="absolute bottom-1/4 left-[10%] w-60 h-60 rounded-full bg-accent/8 blur-[80px]" />

      {/* Navbar inline */}
      <motion.header
        className="relative z-10 px-4 py-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
              <MapPin className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl text-foreground">MoodMap</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">Find your vibe</span>
            <div className="w-1 h-1 rounded-full bg-primary hidden sm:block" />
            <span className="text-sm text-muted-foreground hidden sm:block">Discover places</span>
          </div>
        </div>
      </motion.header>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">AI-powered place discovery</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-display leading-[1.1] text-foreground mb-6">
              Find the right
              <br />
              place for your
              <br />
              <span className="text-gradient italic">mood</span>{" "}
              <span className="text-muted-foreground">&</span>{" "}
              <span className="text-gradient-accent italic">budget</span>
            </h1>
          </motion.div>

          <motion.p
            className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Whether it's a cozy date night or a quick lunch — tell us your vibe and we'll find the perfect venue.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center"
          >
            <Button
              variant="gradient"
              size="lg"
              onClick={onGetStarted}
              className="text-base px-10 h-14 rounded-xl gap-2 shadow-glow hover:shadow-elevated transition-shadow"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
            <span className="text-sm text-muted-foreground">No sign-up required</span>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 flex items-center justify-center gap-8 sm:gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { value: "2.4K+", label: "Places" },
              { value: "5", label: "Moods" },
              { value: "98%", label: "Match rate" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-display text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="relative z-10 pb-8 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <button
          onClick={onGetStarted}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-xs uppercase tracking-widest">Explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowRight className="w-4 h-4 rotate-90" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
