import { motion } from "framer-motion";
import { Briefcase, Heart, Coffee, Utensils, Wallet, Gamepad2, LucideIcon } from "lucide-react";

interface MoodItem {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
  emoji: string;
  gradient: string;
}

const moods: MoodItem[] = [
  { id: "work", label: "Work", icon: Briefcase, description: "Productive & focused", emoji: "💼", gradient: "from-amber-400/30 to-orange-400/15" },
  { id: "date", label: "Date", icon: Heart, description: "Romantic & intimate", emoji: "💕", gradient: "from-rose-400/30 to-pink-400/15" },
  { id: "relax", label: "Relax", icon: Coffee, description: "Calm & comfortable", emoji: "🍵", gradient: "from-teal-400/30 to-emerald-400/15" },
  { id: "quick-bite", label: "Quick Bite", icon: Utensils, description: "Fast & delicious", emoji: "🍜", gradient: "from-sky-400/30 to-blue-400/15" },
  { id: "budget", label: "Budget", icon: Wallet, description: "Great value picks", emoji: "💰", gradient: "from-violet-400/30 to-purple-400/15" },
  { id: "games", label: "Games", icon: Gamepad2, description: "Fun & entertainment", emoji: "🎮", gradient: "from-indigo-400/30 to-cyan-400/15" },
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
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4"
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
            whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(mood.id)}
            className={`
              group relative flex flex-col items-center gap-3 p-6 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden border-2
              ${isSelected
                ? "shadow-elevated border-primary/40 bg-card"
                : "shadow-card hover:shadow-elevated border-transparent bg-card hover:border-primary/20"
              }
            `}
          >
            {/* Gradient background on select */}
            <div className={`absolute inset-0 bg-gradient-to-br ${mood.gradient} transition-opacity duration-300 ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`} />

            <div className="relative z-10">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                isSelected ? "gradient-primary shadow-glow scale-110" : "bg-secondary group-hover:bg-muted"
              }`}>
                <span className="text-2xl">{mood.emoji}</span>
              </div>
            </div>
            <div className="relative z-10 text-center">
              <span className="font-display font-bold text-sm text-foreground block">{mood.label}</span>
              <span className="text-xs text-muted-foreground mt-0.5 block">{mood.description}</span>
            </div>

            {/* Selected indicator */}
            {isSelected && (
              <motion.div
                className="absolute top-2.5 right-2.5 w-3 h-3 rounded-full gradient-primary shadow-glow"
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
