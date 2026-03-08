import { motion } from "framer-motion";

interface StepIndicatorProps {
  current: number;
  total: number;
}

const StepIndicator = ({ current, total }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className={`h-1 rounded-full transition-all duration-500 ${
            i + 1 <= current ? "gradient-primary" : "bg-border"
          }`}
          initial={{ width: 0 }}
          animate={{ width: i + 1 <= current ? 40 : 16 }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 25 }}
        />
      ))}
    </div>
  );
};

export default StepIndicator;
