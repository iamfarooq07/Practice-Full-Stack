import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Check, X, GripVertical, Calendar } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const priorityDot = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-red-500",
};

const priorityLabel = {
  low: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20",
  medium: "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20",
  high: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20",
};

function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: todo._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const saveEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo._id, { text: editText.trim() });
    }
    setEditing(false);
  };

  const cancelEdit = () => {
    setEditText(todo.text);
    setEditing(false);
  };

  const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, height: 0 }}
      transition={{ duration: 0.2 }}
      className={`group flex items-start gap-3 p-4 bg-white dark:bg-gray-900 rounded-xl border transition ${
        todo.completed
          ? "border-gray-100 dark:border-gray-800/50 opacity-60"
          : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
      }`}
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="mt-0.5 text-gray-300 dark:text-gray-700 hover:text-gray-400 dark:hover:text-gray-500 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition"
        aria-label="Drag to reorder"
      >
        <GripVertical className="w-4 h-4" />
      </button>

      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo._id, !todo.completed)}
        className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${
          todo.completed
            ? "bg-blue-600 border-blue-600"
            : "border-gray-300 dark:border-gray-600 hover:border-blue-500"
        }`}
        aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
      >
        {todo.completed && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <div className="flex gap-2">
            <input
              autoFocus
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") saveEdit(); if (e.key === "Escape") cancelEdit(); }}
              className="flex-1 text-sm bg-transparent border-b border-blue-500 outline-none text-gray-900 dark:text-white pb-0.5"
            />
            <button onClick={saveEdit} className="text-blue-600 hover:text-blue-700 transition">
              <Check className="w-4 h-4" />
            </button>
            <button onClick={cancelEdit} className="text-gray-400 hover:text-gray-600 transition">
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <p className={`text-sm text-gray-800 dark:text-gray-200 break-words ${todo.completed ? "line-through text-gray-400 dark:text-gray-500" : ""}`}>
              {todo.text}
            </p>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              {todo.priority && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${priorityLabel[todo.priority]}`}>
                  {todo.priority}
                </span>
              )}
              {todo.dueDate && (
                <span className={`flex items-center gap-1 text-xs ${isOverdue ? "text-red-500" : "text-gray-400 dark:text-gray-500"}`}>
                  <Calendar className="w-3 h-3" />
                  {formatDate(todo.dueDate)}
                  {isOverdue && " · Overdue"}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      {!editing && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition flex-shrink-0">
          <button
            onClick={() => setEditing(true)}
            className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
            aria-label="Edit task"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(todo._id)}
            className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
            aria-label="Delete task"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </motion.div>
  );
}
