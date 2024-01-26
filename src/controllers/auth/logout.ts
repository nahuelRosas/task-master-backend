import { Request, Response } from "express";
import { logInfo } from "@/libs/logInfo";

/**
 * Logs out the user by clearing the token cookie and sending a success message.
 * @param req - The request object.
 * @param res - The response object.
 */
export function logout(req: Request, res: Response): void {
  try {
    res.clearCookie("token");
    res.status(200).send("Logged out");
    logInfo({
      logMessage: `Logged out`,
      logType: "info",
    });
  } catch (error) {
    logInfo({
      logMessage: `Error logging in: ${error}`,
      logType: "error",
    });
    res.status(500).send(error);
  }
}
