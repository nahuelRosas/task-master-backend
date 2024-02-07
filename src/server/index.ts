import configureMorganOptions from "@/middlewares/morgan";
import express, { Express } from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import bodyParser from "body-parser";
import routes from "@/routes";
import { csrf } from "lusca";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app: Express = express();
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
  morgan(configureMorganOptions),
  helmet(),
  cors({
    origin: "*",
    methods: "GET,PUT,POST,DELETE",
    credentials: true,
  }),
  express.json(),
  express.urlencoded({ extended: true }),
  bodyParser.json({ limit: "50mb" }),
  bodyParser.urlencoded({ limit: "50mb", extended: true }),
  cookieParser(),
  csrf(),
  compression(),
  routes
);

export default app;
