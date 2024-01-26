import { RequestWithUser } from "@/types/globals";
import { Response, NextFunction } from "express";
import { logInfo } from "@/libs/log-info";
import { verify } from "jsonwebtoken";

const { JWT_SECRET } = process.env;

/**
 * Validates the access token in the request headers and sets the authenticated user in the request object.
 * If the access token is invalid or missing, it sends an appropriate error response.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function to call.
 */
export function validateToken(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): void {
  const { accessToken } = req.cookies;
  if (!JWT_SECRET) {
    logInfo({
      logMessage: "No JWT secret found in the environment",
      logType: "error",
    });
    res.status(500).send("Internal Server Error");
    return;
  }

  if (!accessToken) {
    logInfo({
      logMessage: "No access token found in the request",
      logType: "error",
    });
    res.status(401).send("Unauthorized");
    return;
  }
  try {
    const user = verify(accessToken.toString(), JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    logInfo({
      logMessage: "Invalid access token",
      logType: "error",
    });
    res.status(401).send("Unauthorized");
  }
}
