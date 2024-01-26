import { RequestWithUser } from "@/types/globals";
import { logInfo } from "@/libs/log-info";
import { Response } from "express";
import validateUser from "@/middlewares/validate-user";
import Task from "@/models/task.model";

/**
 * Deletes a task from the database.
 *
 * @param req - The request object containing user information.
 * @param res - The response object used to send the HTTP response.
 * @returns A Promise that resolves to void.
 */
export async function deleteTask(
  req: RequestWithUser,
  res: Response
): Promise<void> {
  try {
    const user = await validateUser(req, res);
    if (user) {
      const task = await Task.findOneAndDelete({
        _id: req.params.id,
        owner: user._id,
      });

      if (!task) {
        res.status(404).send("Task not found");
        return;
      }

      res.status(200).json(task);
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
