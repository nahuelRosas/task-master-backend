import connectDataBase from "./database";
import { logInfo } from "./libs/log-info";
import app from "./server";

const { PORT } = process.env;

// connectDataBase()
//   .then(() => {
app.listen(PORT || 3000, () =>
  logInfo({
    logMessage: `Server running on port ${PORT || 3000}`,
    logType: "success",
  })
);
// })
// .catch((err) => {
//   logInfo({
//     logMessage: `Error connecting to database: ${err}`,
//     logType: "error",
//   });
// });
