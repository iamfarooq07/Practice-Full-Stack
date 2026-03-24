import { Todo } from "../Model/model.js";

const getAll = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.userId }).sort({ order: 1, createdAt: -1 });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const { text, priority, dueDate } = req.body;
        const count = await Todo.countDocuments({ userId: req.userId });
        const todo = await Todo.create({ userId: req.userId, text, priority, dueDate, order: count });
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!todo) return res.status(404).json({ message: "Todo not found" });
        res.status(200).json(todo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId });
        if (!todo) return res.status(404).json({ message: "Todo not found" });
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const clearCompleted = async (req, res) => {
    try {
        await Todo.deleteMany({ userId: req.userId, completed: true });
        res.status(200).json({ message: "Completed todos cleared" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default { getAll, create, update, remove, clearCompleted };
