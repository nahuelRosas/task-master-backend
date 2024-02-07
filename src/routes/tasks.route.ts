import { validateToken } from "@/middlewares/validate-token";
import { Router } from "express";
import {
  updateTask,
  createTask,
  deleteTask,
  getTasks,
  getTask,
} from "@/controllers/tasks";
const routerTasks: Router = Router();

routerTasks.get("/tasks", validateToken, getTasks);
routerTasks.get("/tasks/:id", validateToken, getTask);
routerTasks.post("/tasks", validateToken, createTask);
routerTasks.delete("/tasks/:id", validateToken, deleteTask);
routerTasks.put("/tasks/:id", validateToken, updateTask);

export default routerTasks;
