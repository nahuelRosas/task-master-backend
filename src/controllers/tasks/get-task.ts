import validateUser from "@/middlewares/validate-user";
import { RequestWithUser } from "@/types/globals";
import { logInfo } from "@/libs/log-info";
import Task from "@/models/task.model";
import { encode } from "html-entities";
import { Response } from "express";

/**
 * Retrieves a task by its ID and owner.
 *
 * @param req - The request object containing user information.
 * @param res - The response object used to send the task or error message.
 * @returns A promise that resolves when the task is retrieved or rejects with an error.
 */
export async function getTask(
  req: RequestWithUser,
  res: Response
): Promise<void> {
  try {
    const user = await validateUser({ req, res });
    if (user) {
      const task = await Task.findOne({
        _id: req.params.id,
        owner: user._id,
      }).populate("owner");
      if (!task) {
        res.status(404).send("Task not found");
        return;
      }
      res.status(200).json(task);
    }
  } catch (error) {
    if (error instanceof Error) {
      logInfo({
        logMessage: `Error getting Task: ${error.message}`,
        logType: "error",
      });
      const encodedErrorMessage = encode(error.message);
      res.status(500).send(encodedErrorMessage);
    }
  }
}
