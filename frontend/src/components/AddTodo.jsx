import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Calendar } from "lucide-react";

const priorities = ["low", "medium", "high"];
const priorityColors = {
  low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function AddTodo({ onAdd }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd({ text: text.trim(), priority, dueDate: dueDate || null });
    setText("");
    setDueDate("");
    setPriority("medium");
    setShowOptions(false);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setShowOptions(true)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={!text.trim()}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:block">Add</span>
          </motion.button>
        </div>

        {showOptions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 flex flex-wrap gap-3 items-center"
          >
            <div className="flex items-center gap-1.5">
              {priorities.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize transition ${
                    priority === p
                      ? priorityColors[p]
                      : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
              <Calendar className="w-3.5 h-3.5" />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="text-xs bg-transparent border-none outline-none text-gray-600 dark:text-gray-300 cursor-pointer"
              />
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
}
