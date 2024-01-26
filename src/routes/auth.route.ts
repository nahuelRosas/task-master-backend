import { login, register } from "@/controllers/auth";
import { Router } from "express";
const router = Router();

router.post("/login", login);
router.post("/register", register);

export default router;
