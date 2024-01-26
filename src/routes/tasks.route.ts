import { getTask } from "@/controllers/tasks";
import { validateToken } from "@/middlewares/validate-token";
import { Router } from "express";
const router = Router();

router.get("/tasks", validateToken, getTask);
router.get("/tasks/:id", validateToken, () => {
  console.log("tasks");
});
router.post("/tasks", validateToken, () => {
  console.log("tasks");
});
router.delete("/tasks/:id", validateToken, () => {
  console.log("tasks");
});
router.put("/tasks/:id", validateToken, () => {
  console.log("tasks");
});

export default router;
