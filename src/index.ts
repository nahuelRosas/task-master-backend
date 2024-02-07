import { logInfo } from "./libs/log-info";
import connectDataBase from "./database";
import app from "./server";

/**
 * The port number for the server.
 */
const { PORT } = process.env;

connectDataBase().then(() => {
  app.listen(PORT || 3000, () =>
    logInfo({
      logMessage: `Server running on port ${PORT || 3000}`,
      logType: "success",
    }),
  );
});
