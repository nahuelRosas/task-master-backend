import { validateToken } from "@/middlewares/validate-token";
import { Router } from "express";
const router = Router();

router.get("/profile", validateToken, (req, res) => {
  res.status(200).send("Profile");
});

export default router;
