import dotenv from "dotenv";
import colors from "colors";
import path from "path";
import fs from "fs";
dotenv.config();
colors.enable();

const { TEMP_DIR } = process.env;

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
  filename,
  logType,
  shouldRestart,
  dir,
}: {
  logMessage?: unknown | string | object;
  filename?: string;
  logType?: "error" | "info" | "success" | "warning" | "rainbow";
  shouldRestart?: boolean;
  dir?: string;
}): void {
  const currentFilename = filename || __filename;
  const restart = shouldRestart || false;

  const handleProcessError = (err: Error | null) => {
    if (err !== null) {
      consoleColors.error(`Error in logInfo: ${err}`);
      return logInfo({ logMessage: err });
    }
  };
  const timestamp = Date.now();
  const humanReadableDateTime = new Date(timestamp).toLocaleString();
  const messageBase = `${humanReadableDateTime} ---- `;
  const logDirectory = dir || TEMP_DIR || "log/console.log";
  const basename = path.basename(currentFilename);
  const formattedLogMessage =
    typeof logMessage === "string"
      ? logMessage
      : JSON.stringify(logMessage, null, 2);

  const logEntry =
    logType === "info" || logType === "rainbow"
      ? `\n ${messageBase} ${basename} ---- ${formattedLogMessage}`
      : logType === "error"
        ? `\n${messageBase}${basename} ---- ERROR: ${formattedLogMessage}`
        : logType === "success"
          ? `\n${messageBase}${basename} ---- SUCCESS: ${formattedLogMessage}`
          : `\n${messageBase}${basename} ---- WARNING: ${formattedLogMessage}`;

  if (logType === "info") {
    consoleColors.info(`${formattedLogMessage}`);
  } else if (logType === "rainbow") {
    consoleColors.rainbow(`${formattedLogMessage}`);
  } else if (logType === "warning") {
    consoleColors.warning(`${formattedLogMessage}`);
  } else if (logType === "error") {
    consoleColors.error(
      `\n${formattedLogMessage} \n${humanReadableDateTime} ---- The log has been modified => ${TEMP_DIR}`
    );
  } else if (logType === "success") {
    consoleColors.success(`${formattedLogMessage}`);
  } else {
    consoleColors.rainbow(`${formattedLogMessage}`);
  }

  restart
    ? fs.writeFile(logDirectory, logEntry, handleProcessError)
    : fs.appendFile(logDirectory, logEntry, handleProcessError);
}
