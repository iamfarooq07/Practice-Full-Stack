import { Router } from "express";
import userController from "../controller/userController.js";
import { registerMiddleware, loginMiddleware } from "../Middleware/middleware.js";

export const route = Router();

route.post("/auth/register", registerMiddleware, userController.postData);
route.post("/auth/login", loginMiddleware);
