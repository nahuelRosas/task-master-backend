import validateUser from "@/middlewares/validate-user";
import { RequestWithUser } from "@/types/globals";
import { logInfo } from "@/libs/log-info";
import Task from "@/models/task.model";
import { Response } from "express";

/**
 * Creates a new task.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A promise that resolves to void.
 */
export async function createTask(
  req: RequestWithUser,
  res: Response,
): Promise<void> {
  try {
    const user = await validateUser({ req, res });
    if (user) {
      const task = await Task.create({
        ...req.body,
        owner: user._id,
      });

      const savedTask = await task.save();
      user.tasks?.push(savedTask);
      await user.save();

      const taskWithOwner = await Task.findById(savedTask._id).populate({
        path: "owner",
        select: "-tasks",
      });

      res.status(201).json(taskWithOwner);
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
