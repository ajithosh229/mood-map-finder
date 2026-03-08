import { motion } from "framer-motion";
import { Briefcase, Heart, Coffee, Utensils, Wallet, Gamepad2, LucideIcon } from "lucide-react";

interface MoodItem {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
  gradient: string;
}

const moods: MoodItem[] = [
  { id: "work", label: "Work", icon: Briefcase, description: "Productive & focused", gradient: "from-amber-500/20 to-orange-500/10" },
  { id: "date", label: "Date", icon: Heart, description: "Romantic & intimate", gradient: "from-rose-500/20 to-pink-500/10" },
  { id: "relax", label: "Relax", icon: Coffee, description: "Calm & comfortable", gradient: "from-teal-500/20 to-emerald-500/10" },
  { id: "quick-bite", label: "Quick Bite", icon: Utensils, description: "Fast & delicious", gradient: "from-sky-500/20 to-blue-500/10" },
  { id: "budget", label: "Budget", icon: Wallet, description: "Great value picks", gradient: "from-violet-500/20 to-purple-500/10" },
  { id: "games", label: "Games", icon: Gamepad2, description: "Fun & entertainment", gradient: "from-indigo-500/20 to-cyan-500/10" },
];

interface MoodSelectorProps {
  selected: string | null;
  onSelect: (mood: string) => void;
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const MoodSelector = ({ selected, onSelect }: MoodSelectorProps) => {
  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {moods.map((mood) => {
        const Icon = mood.icon;
        const isSelected = selected === mood.id;
        return (
          <motion.button
            key={mood.id}
            variants={item}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(mood.id)}
            className={`
              group relative flex flex-col items-center gap-3 p-6 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden
              ${isSelected
                ? "shadow-elevated ring-2 ring-primary/50 bg-card"
                : "shadow-card hover:shadow-elevated bg-card"
              }
            `}
          >
            {/* Gradient background on select */}
            <div className={`absolute inset-0 bg-gradient-to-br ${mood.gradient} transition-opacity duration-300 ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`} />

            <div className="relative z-10">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isSelected ? "gradient-primary shadow-glow" : "bg-secondary group-hover:bg-muted"
              }`}>
                <Icon className={`w-5 h-5 transition-colors ${isSelected ? "text-primary-foreground" : "text-foreground"}`} />
              </div>
            </div>
            <div className="relative z-10 text-center">
              <span className="font-semibold text-sm text-foreground block">{mood.label}</span>
              <span className="text-xs text-muted-foreground mt-0.5 block">{mood.description}</span>
            </div>

            {/* Selected indicator */}
            {isSelected && (
              <motion.div
                className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full gradient-primary"
                layoutId="selectedDot"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default MoodSelector;
