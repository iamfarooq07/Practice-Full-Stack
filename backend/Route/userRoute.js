import { Router } from "express";
import userController from "../controller/userController.js";

export const route = Router();

route.get("/user", userController.getData);

route.get("/user/:id", userController.getDataById);

route.post("/user", userController.postData);

route.put("/user/:id", userController.putData);

route.delete("/user/:id", userController.deleteData);