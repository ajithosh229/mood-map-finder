import { motion } from "framer-motion";
import { MapPin, ArrowRight, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroIllustration from "@/assets/hero-illustration.jpg";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const FloatingStar = ({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: x, top: y }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0.5, 1.2, 0.5],
      rotate: [0, 180, 360],
    }}
    transition={{ repeat: Infinity, duration: 3, delay, ease: "easeInOut" }}
  >
    <Star className="text-primary fill-primary" style={{ width: size, height: size }} />
  </motion.div>
);

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background image with anime overlay */}
      <div className="absolute inset-0">
        <img
          src={heroIllustration}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80 backdrop-blur-[2px]" />
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-1/4 right-[10%] w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-1/4 left-[10%] w-72 h-72 rounded-full bg-accent/10 blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px]" />

      {/* Floating sparkle stars */}
      <FloatingStar delay={0} x="15%" y="20%" size={16} />
      <FloatingStar delay={0.8} x="82%" y="25%" size={12} />
      <FloatingStar delay={1.5} x="70%" y="65%" size={14} />
      <FloatingStar delay={2.2} x="25%" y="70%" size={10} />
      <FloatingStar delay={0.5} x="90%" y="45%" size={8} />

      {/* Navbar inline */}
      <motion.header
        className="relative z-10 px-4 py-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <motion.div
              className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-glow"
              whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
            >
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </motion.div>
            <span className="font-display text-xl font-bold text-foreground">MoodMap ✨</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">Find your vibe</span>
            <div className="w-1.5 h-1.5 rounded-full gradient-primary hidden sm:block" />
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
              className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 mb-8 border-2 border-primary/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-foreground">✨ AI-powered place discovery</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold leading-[1.15] text-foreground mb-6">
              Find the right
              <br />
              place for your
              <br />
              <span className="text-gradient">mood</span>{" "}
              <span className="text-muted-foreground">&</span>{" "}
              <span className="text-gradient-accent">budget</span>
              {" "}💖
            </h1>
          </motion.div>

          <motion.p
            className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Whether it's a cozy date night or a quick lunch — tell us your vibe and we'll find the perfect venue~
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
              className="text-base px-10 h-14 rounded-2xl gap-2 shadow-glow hover:shadow-elevated transition-all hover:scale-105 font-bold"
            >
              Get Started ✨
              <ArrowRight className="w-4 h-4" />
            </Button>
            <span className="text-sm text-muted-foreground font-medium">No sign-up required 🎉</span>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 flex items-center justify-center gap-8 sm:gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { value: "2.4K+", label: "Places", emoji: "🗺️" },
              { value: "6", label: "Moods", emoji: "💫" },
              { value: "98%", label: "Match rate", emoji: "🎯" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center glass rounded-2xl px-5 py-3 border-2 border-primary/10"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <p className="text-2xl font-display font-extrabold text-foreground">{stat.emoji} {stat.value}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5 font-bold">{stat.label}</p>
              </motion.div>
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
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-xs uppercase tracking-widest font-bold">Explore ↓</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
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
