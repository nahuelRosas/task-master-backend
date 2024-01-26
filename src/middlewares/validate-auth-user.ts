import { RequestWithUser } from "@/types/globals";
import { Response, NextFunction } from "express";
import { logInfo } from "@/libs/log-info";
import { Schema } from "zod";

export function validateRegisterUser(schema: Schema) {
  return function (req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const { error } = schema.parse(req.body);
      if (error) {
        logInfo({
          logMessage: `Error validating user: ${error.message}`,
          logType: "error",
        });
        res.status(400).send(error.message);
        return;
      }
      next();
    } catch (error) {
      if (error instanceof Error) {
        logInfo({
          logMessage: `Error validating user: ${error.message}`,
          logType: "error",
        });
        res.status(500).send(error.message);
        return;
      }
    }
  };
}
