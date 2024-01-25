import * as dotenv from "dotenv";
import express from "express";
import { logInfo } from "./libs/logInfo";
dotenv.config();

const app = express();
app.use(express.json());

const { PORT } = process.env;

app.get("/ping", (req: express.Request, res: express.Response) => {
  res.send("pong");
});

app.listen(PORT || 3000, () => {
  logInfo({
    logMessage: `Server running on port ${PORT}`,
    logType: "success",
  });
});
