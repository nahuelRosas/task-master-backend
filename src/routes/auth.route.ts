import { validateRegisterUser } from "@/middlewares/validate-auth-user";
import { registerSchema, loginSchema } from "@/schemas/auth.schema";
import { login, register, logout } from "@/controllers/auth";
import { Router } from "express";
const router = Router();

router.post("/register", validateRegisterUser(registerSchema), register);
router.post("/logout", logout);
router.post("/login", validateRegisterUser(loginSchema), login);

export default router;
