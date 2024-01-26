import { validateRegisterUser } from "@/middlewares/validate-auth-user";
import { registerSchema, loginSchema } from "@/schemas/auth.schema";
import { login, register, logout } from "@/controllers/auth";
import { Router } from "express";
const router = Router();

router.post("/register", validateRegisterUser(registerSchema), register);
router.post("/logout", validateRegisterUser(loginSchema), logout);
router.post("/login", login);

export default router;
