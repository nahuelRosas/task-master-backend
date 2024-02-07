import validateUser from "@/middlewares/validate-user";
import { RequestWithUser } from "@/types/globals";
import { logInfo } from "@/libs/log-info";
import Task from "@/models/task.model";
import { encode } from "html-entities";
import { Response } from "express";
import { z } from "zod";

const priorityEnum: { [key: string]: string } = {
  low: "low",
  medium: "medium",
  high: "high",
  urgent: "urgent",
};

const updateTaskSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  dueDate: z.date().optional(),
  priority: z.nativeEnum(priorityEnum).optional(),
  assignedTo: z.string().optional(),
  subtasks: z.array(z.unknown()).optional(),
});

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
        updateTaskSchema.parse(req.body),
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
