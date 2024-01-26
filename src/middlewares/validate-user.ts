import { RequestWithUser } from "@/types/globals";
import { JwtPayload } from "jsonwebtoken";
import { logInfo } from "@/libs/log-info";
import User from "@/models/user.model";
import { Response } from "express";

/**
 * Validates the user in the request and returns the user object if found.
 * Otherwise, it sends an appropriate error response.
 * @param req - The request object containing the user information.
 * @param res - The response object used to send the error response.
 * @returns The user object if found, otherwise undefined.
 */
export default async function validateUser(
  req: RequestWithUser,
  res: Response,
) {
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
    return user;
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
