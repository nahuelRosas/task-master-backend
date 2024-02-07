import { validateRegisterUser } from "@/middlewares/validate-auth-user";
import { registerSchema, loginSchema } from "@/schemas/auth.schema";
import { login, register, logout } from "@/controllers/auth";
import { Router } from "express";
const routerAuth: Router = Router();

routerAuth.post(
  "/register",
  validateRegisterUser({ schema: registerSchema }),
  register,
);
routerAuth.post("/logout", logout);
routerAuth.post("/login", validateRegisterUser({ schema: loginSchema }), login);

export default routerAuth;
