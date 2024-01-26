import { validateToken } from "@/middlewares/validate-token";
import { getProfile } from "@/controllers/profile/";
import { Router } from "express";
const router = Router();

router.get("/profile", validateToken, getProfile);

export default router;
