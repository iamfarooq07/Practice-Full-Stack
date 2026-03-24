import { Router } from "express";
import todoController from "../controller/todoController.js";
import { authMiddleware } from "../Middleware/middleware.js";

export const todoRoute = Router();

todoRoute.use(authMiddleware);

todoRoute.get("/", todoController.getAll);
todoRoute.post("/", todoController.create);
todoRoute.put("/:id", todoController.update);
todoRoute.delete("/clear-completed", todoController.clearCompleted);
todoRoute.delete("/:id", todoController.remove);
