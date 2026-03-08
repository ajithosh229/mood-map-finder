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
  { id: "work", label: "Work", icon: Briefcase, description: "Productive & focused", gradient: "from-amber-500/10 to-orange-500/5" },
  { id: "date", label: "Date", icon: Heart, description: "Romantic & intimate", gradient: "from-rose-500/10 to-pink-500/5" },
  { id: "relax", label: "Relax", icon: Coffee, description: "Calm & comfortable", gradient: "from-teal-500/10 to-emerald-500/5" },
  { id: "quick-bite", label: "Quick Bite", icon: Utensils, description: "Fast & delicious", gradient: "from-sky-500/10 to-blue-500/5" },
  { id: "budget", label: "Budget", icon: Wallet, description: "Great value picks", gradient: "from-violet-500/10 to-purple-500/5" },
  { id: "games", label: "Games", icon: Gamepad2, description: "Fun & entertainment", gradient: "from-indigo-500/10 to-cyan-500/5" },
];

interface MoodSelectorProps {
  selected: string | null;
  onSelect: (mood: string) => void;
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const MoodSelector = ({ selected, onSelect }: MoodSelectorProps) => {
  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3"
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
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(mood.id)}
            className={`
              group relative flex flex-col items-center gap-2.5 p-5 rounded-xl transition-all duration-200 cursor-pointer overflow-hidden
              ${isSelected
                ? "shadow-elevated ring-2 ring-primary/40 bg-card"
                : "shadow-card hover:shadow-elevated bg-card"
              }
            `}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${mood.gradient} transition-opacity duration-200 ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`} />

            <div className="relative z-10">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                isSelected ? "gradient-primary" : "bg-secondary group-hover:bg-muted"
              }`}>
                <Icon className={`w-5 h-5 transition-colors ${isSelected ? "text-primary-foreground" : "text-foreground"}`} />
              </div>
            </div>
            <div className="relative z-10 text-center">
              <span className="font-semibold text-sm text-foreground block">{mood.label}</span>
              <span className="text-[11px] text-muted-foreground mt-0.5 block">{mood.description}</span>
            </div>

            {isSelected && (
              <motion.div
                className="absolute top-2 right-2 w-2 h-2 rounded-full gradient-primary"
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
