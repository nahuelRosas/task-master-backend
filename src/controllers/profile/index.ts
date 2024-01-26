import { RequestWithUser } from "@/types/globals";
import { logInfo } from "@/libs/log-info";
import { JwtPayload } from "jsonwebtoken";
import User from "@/models/user.model";
import { Response } from "express";

/**
 * Retrieves the profile of a user.
 *
 * @param req - The request object containing user information.
 * @param res - The response object to send the profile data.
 * @returns A Promise that resolves to void.
 */
export async function getProfile(
  req: RequestWithUser,
  res: Response
): Promise<void> {
  try {
    if (!req.user) {
      logInfo({
        logMessage: "No user found in the request",
        logType: "error",
      });
      res.status(401).send("Unauthorized");
      return;
    }
    const { userId } = req.user as JwtPayload;

    const user = await User.findById(userId);
    if (!user) {
      logInfo({
        logMessage: "User not found",
        logType: "error",
      });
      logInfo({
        logMessage: `User ID: ${userId}`,
        logType: "error",
      });
      res.status(404).send("User not found");
      return;
    }
    res.status(200).json({
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
    logInfo({
      logMessage: "Successfully retrieved profile",
      logType: "info",
    });
  } catch (error) {
    if (error instanceof Error) {
      logInfo({
        logMessage: `Error getting profile: ${error.message}`,
        logType: "error",
      });
      res.status(500).send(error.message);
      return;
    }
  }
}
