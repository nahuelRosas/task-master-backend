import { Request, Response } from "express";
import { logInfo } from "@/libs/log-info";
import User from "@/models/user.model";
import { compare } from "bcryptjs";
import { Sign } from "@/libs/jwt";
import { z } from "zod";

const { JWT_SECRET } = process.env;

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

/**
 * Handles the login functionality.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A Promise that resolves to void.
 */

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = loginSchema.parse(req.body);
  try {
    if (!JWT_SECRET) {
      logInfo({
        logMessage: `Error logging in: Missing JWT secret`,
        logType: "error",
      });
      res.status(500).send("Missing JWT secret");
      return;
    }
    if (!email || !password) {
      logInfo({
        logMessage: `Error logging in: Missing parameters`,
        logType: "error",
      });
      res.status(400).send("Missing parameters");
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      logInfo({
        logMessage: `Error logging in: User not found`,
        logType: "error",
      });
      res.status(404).send("User not found");
      return;
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      logInfo({
        logMessage: `Error logging in: Invalid password`,
        logType: "error",
      });
      res.status(401).send("Invalid password");
      return;
    }
    const token = Sign({
      payload: { userId: user._id },
      secretOrPrivateKey: JWT_SECRET,
      res,
    });

    logInfo({
      logMessage: `User ${user.username} logged in`,
      logType: "success",
    });
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token,
    });
  } catch (error) {
    if (error instanceof Error) {
      logInfo({
        logMessage: `Error logging in: ${error.message}`,
        logType: "error",
      });
      res.status(500).send(JSON.stringify(error.message));
      return;
    }
  }
}
