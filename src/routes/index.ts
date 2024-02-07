import profile from "./profile.route";
import tasks from "./tasks.route";
import { Router } from "express";
import auth from "./auth.route";

const router: Router = Router();

router.use("/api", auth, profile, tasks);

export default router;
