import { motion } from "framer-motion";

const messages = {
  all: { title: "No tasks yet", sub: "Add your first task above to get started." },
  active: { title: "All caught up!", sub: "No active tasks. Time to relax." },
  completed: { title: "Nothing completed yet", sub: "Complete a task and it'll show up here." },
};

export default function EmptyState({ filter }) {
  const { title, sub } = messages[filter] || messages.all;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <p className="text-gray-700 dark:text-gray-300 font-medium">{title}</p>
      <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{sub}</p>
    </motion.div>
  );
}
