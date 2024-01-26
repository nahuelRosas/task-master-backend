import validateUser from "@/middlewares/validate-user";
import { RequestWithUser } from "@/types/globals";
import { logInfo } from "@/libs/log-info";
import Task from "@/models/task.model";
import { Response } from "express";

/**
 * Retrieves tasks owned by the authenticated user.
 *
 * @param req - The request object containing user information.
 * @param res - The response object used to send the tasks.
 * @returns A Promise that resolves to void.
 */
export async function getTasks(
  req: RequestWithUser,
  res: Response
): Promise<void> {
  try {
    const user = await validateUser(req, res);
    if (user) {
      const tasks = await Task.find({ owner: user._id }).populate("owner");
      res.status(200).json(tasks);
    }
  } catch (error) {
    if (error instanceof Error) {
      logInfo({
        logMessage: `Error getting Tasks: ${error.message}`,
        logType: "error",
      });
      res.status(500).send(error.message);
      return;
    }
  }
}
