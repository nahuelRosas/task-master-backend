import { Secret, SignOptions, sign } from "jsonwebtoken";
import { logInfo } from "./log-info";
import { Response } from "express";

/**
 * Signs the payload with the provided secret or private key and returns the encoded token.
 * It also creates a cookie with the encoded token and sets it in the provided response object.
 * @param secretOrPrivateKey - The secret or private key used to sign the token.
 * @param payload - The data to be included in the token.
 * @param res - The response object to set the token cookie.
 * @param options - Optional sign options.
 * @returns The encoded token or undefined if an error occurs.
 * @throws If an error occurs while creating the access token.
 */
export function Sign({
  secretOrPrivateKey,
  payload,
  res,
  options = {
    expiresIn: "1d",
  },
}: {
  payload: string | object | Buffer;
  secretOrPrivateKey: Secret;
  options?: SignOptions;
  res: Response;
}): string | undefined {
  try {
    const encoded = sign(payload, secretOrPrivateKey, options);
    return createCookie({ encoded, res });
  } catch (err) {
    if (err instanceof Error) {
      logInfo({
        logMessage: `Error creating access token: ${err}`,
        logType: "error",
      });
      throw err;
    }
  }
}

/**
 * Creates a cookie with the provided encoded value and sets it in the response object.
 * @param {Object} options - The options for creating the cookie.
 * @param {string | undefined} options.encoded - The encoded value to be set as the cookie value.
 * @param {Response} options.res - The response object to set the cookie in.
 * @returns {string | undefined} The encoded value that was set as the cookie value.
 */
function createCookie({
  encoded,
  res,
}: {
  encoded: string | undefined;
  res: Response;
}): string | undefined {
  res.cookie("accessToken", encoded, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  return encoded;
}
