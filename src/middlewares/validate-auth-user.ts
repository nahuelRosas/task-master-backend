import { RequestWithUser } from "@/types/globals";
import { Response, NextFunction } from "express";
import { logInfo } from "@/libs/log-info";
import { Schema } from "zod";

/**
 * Validates the registration data of a user using a given schema.
 * If the data is invalid, it logs an error and sends an appropriate response.
 * Otherwise, it calls the next middleware in the chain.
 *
 * @param {Object} options - The options object.
 * @param {Schema} options.schema - The schema used for validation.
 * @returns {Function} - The middleware function.
 */
export function validateRegisterUser({
  schema,
}: {
  schema: Schema;
}): (req: RequestWithUser, res: Response, next: NextFunction) => void {
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
