import configureMorganOptions from "@/middlewares/morgan";
import express, { Express } from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import bodyParser from "body-parser";
import routes from "@/routes";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

const app: Express = express();

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
