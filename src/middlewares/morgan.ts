import { IncomingMessage, ServerResponse } from "http";
import { logInfo } from "@/libs/logInfo";
import { TokenIndexer } from "morgan";

/**
 * Configures the options for the Morgan middleware.
 *
 * @param tokens - The token indexer.
 * @param req - The incoming request.
 * @param res - The server response.
 * @returns Null or undefined.
 */
export default function configureMorganOptions(
  tokens: TokenIndexer,
  req: IncomingMessage,
  res: ServerResponse
): null | undefined {
  if (!tokens) return null;

  const remoteAddr = tokens?.["remote-addr"]?.(req, res);
  const remoteUser = tokens?.["remote-user"]?.(req, res);
  const method = tokens?.method?.(req, res);
  const url = tokens?.url?.(req, res);
  const httpVersion = tokens?.["http-version"]?.(req, res);
  const status = tokens?.status?.(req, res);
  const responseTime = tokens["response-time"]?.(req, res);
  const userAgent = tokens["user-agent"]?.(req, res);

  const response = {
    RemoteAddr: remoteAddr,
    RemoteUser: remoteUser,
    Method: method,
    URL: url,
    HTTPVersion: httpVersion,
    Status: status,
    ResponseTime: responseTime + "ms",
    UserAgent: userAgent,
  };

  if (status) {
    const logType =
      typeof status === "undefined" || +status >= 400 ? "error" : "info";

    let logMessage = JSON.stringify(response, null, 1);
    logMessage = logMessage
      .replace(/{/g, "")
      .replace(/}/g, "")
      .replace(/,/g, "")
      .replace(/ /g, "");

    logInfo({
      logMessage: `New connection
      ${logMessage}`,
      filename: "MORGAN-MIDDLEWARE",
      logType,
    });
  }

  return null;
}
