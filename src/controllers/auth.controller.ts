import { Request, Response } from "express";
import User from "@/models/user.model";
import { logInfo } from "@/libs/logInfo";
export async function register(req: Request, res: Response) {
  const { email, password, username } = req.body;
  try {
    const user = new User({ email, password, username });
    await user.save();
    logInfo({
      logMessage: `User ${user.username} created`,
      logType: "success",
    });
    res.send(`User ${user.username} created`);
  } catch (error) {
    logInfo({
      logMessage: `Error creating user: ${error}`,
      logType: "error",
    });

    res.status(500).send(error);
  }
}

export function login(req: Request, res: Response) {
  res.send("login");
}
