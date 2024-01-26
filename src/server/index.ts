import { IncomingMessage, ServerResponse } from "node:http";
import morgan, { TokenIndexer } from "morgan";
import express, { Express } from "express";
import cookieParser from "cookie-parser";
import { logInfo } from "@/libs/logInfo";
import routes from "@/routes";
import compression from "compression";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

const app: Express = express();

/**
 * Configures the options for the Morgan middleware.
 *
 * @param tokens - The token indexer.
 * @param req - The incoming request.
 * @param res - The server response.
 * @returns Null or undefined.
 */
function configureMorganOptions(
  tokens: TokenIndexer,
  req: IncomingMessage,
  res: ServerResponse
): null | undefined {
  if (!tokens) return null;

  const status = tokens?.status?.(req, res);
  const response = `We got a request!
  
    Remote Addr: ${tokens?.["remote-addr"]?.(req, res)}
    Remote User: ${tokens?.["remote-user"]?.(req, res)}
    Method: ${tokens?.method?.(req, res)}
    URL: ${tokens?.url?.(req, res)}
    HTTP Version: ${tokens?.["http-version"]?.(req, res)}
    Status: ${status}
    Response Time: ${tokens["response-time"]?.(req, res)}ms
    User-Agent: ${tokens["user-agent"]?.(req, res)}`;

  if (status) {
    const logType =
      typeof status === "undefined" || +status >= 400 ? "error" : "info";
    logInfo({
      logMessage: response,
      filename: "MORGAN-MIDDLEWARE",
      logType,
    });
  }

  return null;
}

// Middleware Setup
app.use(
  morgan(configureMorganOptions),
  helmet(),
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
  express.json(),
  express.urlencoded({ extended: true }),
  bodyParser.json({ limit: "50mb" }),
  bodyParser.urlencoded({ limit: "50mb", extended: true }),
  cookieParser(),
  compression(),
  routes
);

export default app;
