import { validateToken } from "@/middlewares/validate-token";
import { Router } from "express";
import {
  updateTask,
  createTask,
  deleteTask,
  getTasks,
  getTask,
} from "@/controllers/tasks";
const router = Router();

router.get("/tasks", validateToken, getTask);
router.get("/tasks/:id", validateToken, getTasks);
router.post("/tasks", validateToken, createTask);
router.delete("/tasks/:id", validateToken, deleteTask);
router.put("/tasks/:id", validateToken, updateTask);

export default router;
