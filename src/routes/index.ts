import profile from "./profile.route";
import { Router } from "express";
import auth from "./auth.route";

const router = Router();

router.get("/", (req, res) => {
  const html = `
<html>
    <head>
      <title>Technical Test Crud</title>
    </head>
    <body>
        <h1>Technical Test Crud - Nahuel Rosas</h1>
        <p>API</p>
        <ul>
            <li><a href="/api/profile">Profile</a></li>
        </ul>
    </body>
</html>`;
  res.send(html);
});
router.use("/api", auth, profile);

export default router;
