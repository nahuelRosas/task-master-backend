import validateUser from "@/middlewares/validate-user";
import { RequestWithUser } from "@/types/globals";
import { logInfo } from "@/libs/log-info";
import Task from "@/models/task.model";
import { encode } from "html-entities";
import { Response } from "express";

export async function updateTask(
  req: RequestWithUser,
  res: Response
): Promise<void> {
  try {
    const user = await validateUser({ req, res });
    if (user) {
      const task = await Task.findOneAndUpdate(
        {
          _id: req.params.id,
          owner: user._id,
        },
        req.body,
        {
          new: true,
        }
      ).populate("owner");

      if (!task) {
        res.status(404).send("Task not found");
        return;
      }

      user.tasks = user.tasks?.filter(
        (taskID) => taskID.toString() !== req.params.id
      );
      user.tasks?.push(task);
      await user.save();
      res.status(200).json(task);
    }
  } catch (error) {
    if (error instanceof Error) {
      logInfo({
        logMessage: `Error getting profile: ${error.message}`,
        logType: "error",
      });
      const encodedErrorMessage = encode(error.message);
      res.status(500).send(encodedErrorMessage);
    }
  }
}
