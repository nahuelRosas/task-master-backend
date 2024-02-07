import { Request, Response } from "express";
import { logInfo } from "@/libs/log-info";

/**
 * Logs out the user by clearing the token cookie and sending a success message.
 * @param _req - The request object.
 * @param res - The response object.
 */
export function logout(_req: Request, res: Response): void {
  try {
    res.clearCookie("accessToken");
    res.status(200).send("Logged out");
    logInfo({
      logMessage: `Logged out`,
      logType: "info",
    });
  } catch (error) {
    if (error instanceof Error) {
      logInfo({
        logMessage: `Error logging in: ${error}`,
        logType: "error",
      });
      res.status(500).send(JSON.stringify(error.message));
    }
  }
}
