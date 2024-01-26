import { Request, Response, NextFunction } from "express";
import { logInfo } from "@/libs/log-info";

/**
 * Middleware function to validate the presence of an access token in the request.
 * If no access token is found, it logs an error and sends a 401 Unauthorized response.
 * Otherwise, it calls the next middleware function.
 *
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @param next - The Express NextFunction.
 */
export function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    logInfo({
      logMessage: "No access token found in the request",
      logType: "error",
    });
    res.status(401).send("Unauthorized");
    return;
  }

  next();
}
