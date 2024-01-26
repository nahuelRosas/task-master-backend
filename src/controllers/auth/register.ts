import { Request, Response } from "express";
import { logInfo } from "@/libs/log-info";
import User from "@/models/user.model";
import { Sign } from "@/libs/jwt";
import { hash } from "bcryptjs";

const { JWT_SECRET } = process.env;

/**
 * Registers a new user.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A Promise that resolves to void.
 */
export async function register(req: Request, res: Response): Promise<void> {
  const { email, password, username } = req.body;
  try {
    if (!JWT_SECRET) {
      logInfo({
        logMessage: `Error creating user: Missing JWT secret`,
        logType: "error",
      });
      res.status(500).send("Missing JWT secret");
      return;
    }
    if (!email || !password || !username) {
      logInfo({
        logMessage: `Error creating user: Missing parameters`,
        logType: "error",
      });
      res.status(400).send("Missing parameters");
      return;
    }

    const passwordHash = await hash(password, 10);
    const user = new User({ email, password: passwordHash, username });
    await user.save();

    const token = Sign({
      payload: { userId: user._id },
      secretOrPrivateKey: JWT_SECRET,
      res,
    });
    logInfo({
      logMessage: `User ${user.username} created`,
      logType: "success",
    });
    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token,
    });
  } catch (error) {
    logInfo({
      logMessage: `Error creating user: ${error}`,
      logType: "error",
    });
    res.status(500).send(error);
  }
}
