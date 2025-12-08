import app from "./app.js";
import logger from "./utils/logger.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = 3001;
app.listen(PORT, () => {
  logger.info(`server listening on http://localhost${PORT}`);
});
