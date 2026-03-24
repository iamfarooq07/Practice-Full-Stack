import { useState, useEffect, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import toast from "react-hot-toast";
import api from "../api/axios";
import Header from "../components/Header";
import AddTodo from "../components/AddTodo";
import TodoItem from "../components/TodoItem";
import EmptyState from "../components/EmptyState";
import { Search, X } from "lucide-react";

const FILTERS = ["all", "active", "completed"];

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await api.get("/todos");
      setTodos(res.data);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async ({ text, priority, dueDate }) => {
    try {
      const res = await api.post("/todos", { text, priority, dueDate });
      setTodos((prev) => [res.data, ...prev]);
      toast.success("Task added");
    } catch {
      toast.error("Failed to add task");
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const res = await api.put(`/todos/${id}`, { completed });
      setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch {
      toast.error("Failed to update task");
    }
  };

  const editTodo = async (id, updates) => {
    try {
      const res = await api.put(`/todos/${id}`, updates);
      setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)));
      toast.success("Task updated");
    } catch {
      toast.error("Failed to update task");
    }
  };

  const deleteTodo = async (id) => {
    setTodos((prev) => prev.filter((t) => t._id !== id));
    try {
      await api.delete(`/todos/${id}`);
      toast.success("Task deleted");
    } catch {
      toast.error("Failed to delete task");
      fetchTodos();
    }
  };

  const clearCompleted = async () => {
    const count = todos.filter((t) => t.completed).length;
    if (!count) return;
    setTodos((prev) => prev.filter((t) => !t.completed));
    try {
      await api.delete("/todos/clear-completed");
      toast.success(`Cleared ${count} completed task${count > 1 ? "s" : ""}`);
    } catch {
      toast.error("Failed to clear completed");
      fetchTodos();
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = todos.findIndex((t) => t._id === active.id);
    const newIndex = todos.findIndex((t) => t._id === over.id);
    const reordered = arrayMove(todos, oldIndex, newIndex);
    setTodos(reordered);

    try {
      await Promise.all(
        reordered.map((todo, i) => api.put(`/todos/${todo._id}`, { order: i }))
      );
    } catch {
      fetchTodos();
    }
  };

  const filtered = useMemo(() => {
    return todos
      .filter((t) => {
        if (filter === "active") return !t.completed;
        if (filter === "completed") return t.completed;
        return true;
      })
      .filter((t) => !search || t.text.toLowerCase().includes(search.toLowerCase()));
  }, [todos, filter, search]);

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">My Tasks</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {activeCount} remaining · {completedCount} completed
          </p>
        </div>

        {/* Add Todo */}
        <div className="mb-4">
          <AddTodo onAdd={addTodo} />
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter tabs + clear */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition ${
                  filter === f
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {f}
                {f === "active" && activeCount > 0 && (
                  <span className="ml-1.5 text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded-full">
                    {activeCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {completedCount > 0 && (
            <button
              onClick={clearCompleted}
              className="text-xs text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition"
            >
              Clear completed
            </button>
          )}
        </div>

        {/* Todo list */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState filter={search ? "all" : filter} />
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={filtered.map((t) => t._id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                  {filtered.map((todo) => (
                    <TodoItem
                      key={todo._id}
                      todo={todo}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                      onEdit={editTodo}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </SortableContext>
          </DndContext>
        )}
      </main>
    </div>
  );
}
