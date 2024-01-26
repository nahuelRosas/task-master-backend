import { logInfo } from "@/libs/logInfo";
import * as dotenv from "dotenv";
import express, { Express } from "express";

dotenv.config();
const { PORT } = process.env;

/**
 * Express application instance.
 */
const app: Express = express();

app.use(express.json());
export const server = app.listen(PORT || 3000, () => {
  logInfo({
    logMessage: `Server running on port ${PORT}`,
    logType: "success",
  });
});

export default app;
