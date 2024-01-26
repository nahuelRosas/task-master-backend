import validateUser from "@/middlewares/validate-user";
import { RequestWithUser } from "@/types/globals";
import { logInfo } from "@/libs/log-info";
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
  res: Response,
): Promise<void> {
  try {
    const user = await validateUser(req, res);
    if (user) {
      res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        firstName: user.firstName,
        lastName: user.lastName,
        avatarUrl: user.avatarUrl,
        bio: user.bio,
        role: user.role,
        lastLogin: user.lastLogin,
        tasks: user.tasks,
      });
      logInfo({
        logMessage: "Successfully retrieved profile",
        logType: "info",
      });
    }
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
