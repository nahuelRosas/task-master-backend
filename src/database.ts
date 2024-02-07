import { logInfo } from "./libs/log-info";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const { MONGODB_URI } = process.env;
/**
 * Connects to the database.
 * @returns A Promise that resolves to void.
 */
async function connectDataBase(): Promise<void> {
  try {
    if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined");
    const data = await mongoose.connect(MONGODB_URI);
    logInfo({
      logMessage: `MONGO DB CONECTED WITH SERVER ${data.connection.host.toUpperCase()}`,
      filename: __filename,
      logType: "success",
    });
  } catch (data) {
    logInfo({
      logMessage: `${data}`,
      filename: __filename,
      logType: "error",
    });
    process.exit(1);
  }
}

export default connectDataBase;
