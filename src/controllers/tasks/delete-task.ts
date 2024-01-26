import { RequestWithUser } from "@/types/globals";
import { logInfo } from "@/libs/log-info";
import { Response } from "express";
import validateUser from "@/middlewares/validate-user";

export async function deleteTask(
  req: RequestWithUser,
  res: Response
): Promise<void> {
  try {
    const user = await validateUser(req, res);
    if (!user) {
      return;
    }
    console.log(user);
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
