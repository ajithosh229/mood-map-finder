import { MapPin, Navigation } from "lucide-react";
import { motion } from "framer-motion";

const pins = [
  { top: "28%", left: "22%", label: "Café Luna", size: "lg" },
  { top: "42%", left: "52%", label: "The Nook", size: "md" },
  { top: "62%", left: "32%", label: "Bistro 45", size: "md" },
  { top: "22%", left: "68%", label: "Zen Garden", size: "lg" },
  { top: "58%", left: "72%", label: "Quick Eats", size: "sm" },
];

const MapPlaceholder = () => {
  return (
    <div className="relative w-full h-72 sm:h-[420px] rounded-2xl overflow-hidden bg-secondary/50 border border-border">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.06]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Organic shapes for districts */}
      <div className="absolute top-[15%] left-[15%] w-[35%] h-[30%] rounded-[40%_60%_50%_40%] bg-primary/5" />
      <div className="absolute bottom-[20%] right-[15%] w-[30%] h-[35%] rounded-[50%_40%_60%_40%] bg-accent/5" />
      <div className="absolute top-[40%] left-[40%] w-[25%] h-[25%] rounded-[45%_55%_50%_50%] bg-primary/3" />

      {/* Roads */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 0 50 Q 30 45 50 50 T 100 48" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.15" opacity="0.15" />
        <path d="M 35 0 Q 38 30 35 50 T 38 100" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.15" opacity="0.15" />
        <path d="M 0 30 Q 50 28 100 32" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.1" opacity="0.1" />
        <path d="M 65 0 Q 62 50 67 100" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.1" opacity="0.1" />
      </svg>

      {/* Pins */}
      {pins.map((pin, i) => (
        <motion.div
          key={pin.label}
          className="absolute flex flex-col items-center"
          style={{ top: pin.top, left: pin.left }}
          initial={{ opacity: 0, scale: 0, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.12, type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="relative group cursor-pointer">
            {/* Pulse ring */}
            <div className="absolute inset-0 -m-2 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: "3s", animationDelay: `${i * 0.6}s` }} />

            <div className={`relative gradient-primary rounded-full flex items-center justify-center shadow-glow ${
              pin.size === "lg" ? "w-8 h-8" : pin.size === "md" ? "w-6 h-6" : "w-5 h-5"
            }`}>
              <MapPin className={`text-primary-foreground ${
                pin.size === "lg" ? "w-4 h-4" : "w-3 h-3"
              }`} />
            </div>

            {/* Tooltip */}
            <div className="absolute -top-9 left-1/2 -translate-x-1/2 glass-strong rounded-lg px-2.5 py-1 text-xs font-medium text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-100 shadow-elevated">
              {pin.label}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Controls overlay */}
      <div className="absolute top-3 right-3 flex flex-col gap-1.5">
        <div className="glass-strong rounded-lg w-8 h-8 flex items-center justify-center cursor-pointer hover:shadow-elevated transition-shadow">
          <span className="text-foreground text-sm font-bold">+</span>
        </div>
        <div className="glass-strong rounded-lg w-8 h-8 flex items-center justify-center cursor-pointer hover:shadow-elevated transition-shadow">
          <span className="text-foreground text-sm font-bold">−</span>
        </div>
      </div>

      {/* Navigation button */}
      <div className="absolute bottom-3 right-3 glass-strong rounded-xl px-3.5 py-2 flex items-center gap-2 cursor-pointer hover:shadow-elevated transition-shadow">
        <Navigation className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-medium text-foreground">Interactive map</span>
      </div>

      {/* Location label */}
      <div className="absolute bottom-3 left-3 glass rounded-lg px-3 py-1.5 text-xs text-muted-foreground">
        Downtown Area
      </div>
    </div>
  );
};

export default MapPlaceholder;
