import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
            <MapPin className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg text-foreground">MoodMap</span>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
