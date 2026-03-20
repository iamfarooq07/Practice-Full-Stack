import { Router } from "express";
import userController from "../controller/userController.js";
import { registerMiddleware } from "../Middleware/middleware.js";

export const route = Router();

route.get("/user", userController.getData);

route.get("/user/:id", userController.getDataById);

// registerMiddleware pehle chalega, phir postData
route.post("/user", registerMiddleware, userController.postData);

route.put("/user/:id", userController.putData);

route.delete("/user/:id", userController.deleteData);