import { validateToken } from "@/middlewares/validate-token";
import { Router } from "express";
const router = Router();

router.get("/tasks", validateToken, () => {
  console.log("tasks");
});

export default router;
