import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

/**
 * Represents an HTTP request with an optional user property.
 */
export interface RequestWithUser extends Request {
  user?: JwtPayload | string;
}
