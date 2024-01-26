import connectDataBase from "./database";
import express from "express";
import app from "./server";

// Connect to the database.
connectDataBase();

app.get("/ping", (req: express.Request, res: express.Response) => {
  res.send("pong");
});
