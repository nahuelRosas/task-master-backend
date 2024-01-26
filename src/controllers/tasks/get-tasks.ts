import validateUser from "@/middlewares/validate-user";
import { RequestWithUser } from "@/types/globals";
import { logInfo } from "@/libs/log-info";
import Task from "@/models/task.model";
import { Response } from "express";

export async function getTasks(
  req: RequestWithUser,
  res: Response
): Promise<void> {
  try {
    const user = await validateUser(req, res);
    if (user) {
      const tasks = await Task.find({ owner: user._id });
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
