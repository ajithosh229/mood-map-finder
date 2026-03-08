import { motion } from "framer-motion";
import { Briefcase, Heart, Coffee, Utensils, Wallet } from "lucide-react";

const moods = [
  { id: "work", label: "Work", icon: Briefcase, description: "Productive vibes" },
  { id: "date", label: "Date", icon: Heart, description: "Romantic & cozy" },
  { id: "relax", label: "Relax", icon: Coffee, description: "Chill & unwind" },
  { id: "quick-bite", label: "Quick Bite", icon: Utensils, description: "Fast & tasty" },
  { id: "budget", label: "Budget", icon: Wallet, description: "Easy on the wallet" },
];

interface MoodSelectorProps {
  selected: string | null;
  onSelect: (mood: string) => void;
}

const MoodSelector = ({ selected, onSelect }: MoodSelectorProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {moods.map((mood, i) => {
        const Icon = mood.icon;
        const isSelected = selected === mood.id;
        return (
          <motion.button
            key={mood.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => onSelect(mood.id)}
            className={`
              relative flex flex-col items-center gap-2 p-5 rounded-xl border-2 transition-all cursor-pointer
              ${isSelected
                ? "border-primary bg-primary/5 shadow-elevated"
                : "border-border bg-card hover:border-primary/40 shadow-card hover:shadow-elevated"
              }
            `}
          >
            <div className={`p-3 rounded-full ${isSelected ? "gradient-primary" : "bg-secondary"}`}>
              <Icon className={`w-5 h-5 ${isSelected ? "text-primary-foreground" : "text-foreground"}`} />
            </div>
            <span className="font-semibold text-sm text-foreground">{mood.label}</span>
            <span className="text-xs text-muted-foreground">{mood.description}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default MoodSelector;
