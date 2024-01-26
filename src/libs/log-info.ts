import dotenv from "dotenv";
import colors from "colors";
dotenv.config();
colors.enable();

const consoleColors = {
  error: (message: string) => console.log(colors.bgRed(message).bold),
  info: (message: string) => console.log(colors.bgMagenta(message).bold),
  success: (message: string) => console.log(colors.bgGreen(message).bold),
  warning: (message: string) => console.log(colors.bgYellow(message).bold),
  rainbow: (message: string) => console.log(colors.rainbow(message).bold),
};

/**
 * Logs information to a file or console.
 *
 * @param logMessage - The message to be logged. It can be a string, object, or any other type.
 * @param filename - The name of the file where the log is being written. If not provided, it defaults to the current filename.
 * @param logType - The type of log. It can be "error", "info", "success", "warning", or "rainbow". Defaults to "info".
 * @param shouldRestart - Indicates whether the log file should be overwritten (true) or appended (false). Defaults to false.
 * @param dir - The directory where the log file should be stored. If not provided, it defaults to "./src/temp/Logs.log".
 */
export function logInfo({
  logMessage,
  logType,
}: {
  logMessage?: unknown | string | object;
  filename?: string;
  logType?: "error" | "info" | "success" | "warning" | "rainbow";
  shouldRestart?: boolean;
}): void {
  const timestamp = Date.now();
  const humanReadableDateTime = new Date(timestamp).toLocaleString();

  const formattedLogMessage =
    typeof logMessage === "string"
      ? logMessage
      : JSON.stringify(logMessage, null, 2);

  const message = `\n${humanReadableDateTime}\n${formattedLogMessage} \n`;

  if (logType === "info") {
    consoleColors.info(message);
  } else if (logType === "rainbow") {
    consoleColors.rainbow(message);
  } else if (logType === "warning") {
    consoleColors.warning(message);
  } else if (logType === "error") {
    consoleColors.error(message);
  } else if (logType === "success") {
    consoleColors.success(message);
  } else {
    consoleColors.rainbow(message);
  }
}
