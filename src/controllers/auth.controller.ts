import { Request, Response } from "express";
import { logInfo } from "@/libs/logInfo";
import User from "@/models/user.model";
import { hash } from "bcryptjs";

export async function register(req: Request, res: Response) {
  const { email, password, username } = req.body;
  try {
    const passwordHash = await hash(password, 500);

    const user = new User({ email, password: passwordHash, username });

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
