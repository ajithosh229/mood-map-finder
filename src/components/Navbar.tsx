import { MapPin, Heart, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <motion.button
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shadow-glow"
            whileHover={{ rotate: [0, -10, 10, 0] }}
          >
            <MapPin className="w-4 h-4 text-primary-foreground" />
          </motion.div>
          <span className="font-display text-lg font-bold text-foreground">MoodMap ✨</span>
        </motion.button>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <button
                onClick={() => navigate("/favorites")}
                className="flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-xl hover:bg-secondary"
              >
                <Heart className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Favorites 💖</span>
              </button>
              <button
                onClick={signOut}
                className="flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-xl hover:bg-secondary"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="flex items-center gap-1.5 text-sm font-bold text-primary hover:text-foreground transition-colors px-3 py-1.5 rounded-xl hover:bg-secondary"
            >
              <User className="w-3.5 h-3.5" />
              Sign In ✨
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
