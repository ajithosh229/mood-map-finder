import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

const pins = [
  { top: "30%", left: "25%", label: "Café Luna" },
  { top: "45%", left: "55%", label: "The Nook" },
  { top: "60%", left: "35%", label: "Bistro 45" },
  { top: "25%", left: "70%", label: "Zen Garden" },
  { top: "55%", left: "75%", label: "Quick Eats" },
];

const MapPlaceholder = () => {
  return (
    <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-secondary border border-border">
      {/* Fake map grid */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`h-${i}`} className="absolute w-full border-t border-foreground/10" style={{ top: `${(i + 1) * 8}%` }} />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`v-${i}`} className="absolute h-full border-l border-foreground/10" style={{ left: `${(i + 1) * 8}%` }} />
        ))}
      </div>

      {/* Fake roads */}
      <div className="absolute top-0 bottom-0 left-1/3 w-1 bg-foreground/5" />
      <div className="absolute left-0 right-0 top-1/2 h-1 bg-foreground/5" />

      {/* Pins */}
      {pins.map((pin, i) => (
        <motion.div
          key={pin.label}
          className="absolute flex flex-col items-center"
          style={{ top: pin.top, left: pin.left }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.1 }}
        >
          <div className="relative group cursor-pointer">
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-1 rounded-full bg-foreground/20 blur-sm" />
            <MapPin className="w-7 h-7 text-primary drop-shadow-md animate-float" style={{ animationDelay: `${i * 0.5}s` }} />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-card border border-border rounded-md px-2 py-0.5 text-xs font-medium text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-card">
              {pin.label}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Map label */}
      <div className="absolute bottom-3 right-3 bg-card/80 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs text-muted-foreground border border-border">
        Interactive map — coming soon
      </div>
    </div>
  );
};

export default MapPlaceholder;
