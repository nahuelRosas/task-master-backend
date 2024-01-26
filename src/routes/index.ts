import profile from "./profile.route";
import { Router } from "express";
import auth from "./auth.route";

const router = Router();

router.use("/api", auth, profile);

export default router;
