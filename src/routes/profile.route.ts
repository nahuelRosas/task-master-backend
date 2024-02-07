import { validateToken } from "@/middlewares/validate-token";
import { getProfile } from "@/controllers/profile/";
import { Router } from "express";
const routerProfile: Router = Router();

routerProfile.get("/profile", validateToken, getProfile);

export default routerProfile;
