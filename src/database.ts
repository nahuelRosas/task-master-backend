import { logInfo } from "./libs/log-info";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const { URL_MONGO } = process.env;
/**
 * Connects to the database.
 * @returns A Promise that resolves to void.
 */
async function connectDataBase(): Promise<void> {
  try {
    const data = await mongoose.connect(
      `${URL_MONGO || "mongodb://localhost:27017"}`
    );
    logInfo({
      logMessage: `MONGO DB CONECTED WITH SERVER ${data.connection.host.toUpperCase()}`,
      filename: __filename,
      logType: "success",
    });
  } catch (data) {
    logInfo({
      logMessage: `Error ${data}`,
      filename: __filename,
      logType: "error",
    });
  }
}

export default connectDataBase;
