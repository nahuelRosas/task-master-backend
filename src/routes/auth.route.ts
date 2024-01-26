import { login, register, logout } from "@/controllers/auth";
import { Router } from "express";
const router = Router();

router.post("/register", register);
router.post("/logout", logout);
router.post("/login", login);

export default router;
