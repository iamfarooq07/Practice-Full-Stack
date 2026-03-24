import { CheckSquare, Sun, Moon, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function Header() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-blue-600" />
          <span className="font-bold text-gray-900 dark:text-white">Taskly</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
            {user?.name}
          </span>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggle}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:block">Logout</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
