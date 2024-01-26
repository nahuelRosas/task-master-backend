import express from "express";
import app from "./server";

app.get("/ping", (req: express.Request, res: express.Response) => {
  res.send("pong");
});
