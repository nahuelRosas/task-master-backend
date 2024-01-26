import { Router } from "express";
import auth from "./auth.route";

const router = Router();

router.use("/api", auth);

export default router;
