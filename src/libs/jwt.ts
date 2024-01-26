import { Secret, SignOptions, sign } from "jsonwebtoken";
import { logInfo } from "./logInfo";
import { Response } from "express";

/**
 * Signs the payload with the provided secret or private key and options,
 * and creates a cookie with the encoded access token in the response.
 *
 * @param payload - The data to be signed (string, object, or buffer).
 * @param secretOrPrivateKey - The secret or private key used for signing.
 * @param options - The options for signing the payload (default: { expiresIn: "1d" }).
 * @param res - The response object to set the access token cookie.
 */
export function Sign({
  payload,
  secretOrPrivateKey,
  options = {
    expiresIn: "1d",
  },
  res,
}: {
  payload: string | object | Buffer;
  secretOrPrivateKey: Secret;
  options?: SignOptions;
  res: Response;
}): void {
  function createCookie(err: Error | null, encoded: string | undefined) {
    if (err) {
      logInfo({
        logMessage: `Error creating access token: ${err}`,
        logType: "error",
      });
      throw err;
    }
    res.cookie("accessToken", encoded, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return encoded;
  }
  return sign(payload, secretOrPrivateKey, options, createCookie);
}
