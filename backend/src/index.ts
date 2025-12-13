import mongoose from "mongoose";
import app from "./app.js";
import logger from "./utils/logger.js";
import dotenv from "dotenv";
dotenv.config();

if (process.env.NODE_ENV === 'production') {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info("db connection successful");
  } catch (err) {
    logger.error(`db connection failed with ${err}`);
  }
} else {
  try {
    await mongoose.connect(process.env.TEST_MONGODB_URI);
    logger.info("db connection successful");
  } catch (err) {
    logger.error(`db connection failed with ${err}`);
  }
}

const PORT = process.env.port || 3001;
app.listen(PORT, () => {
  logger.info(`server listening on http://localhost${PORT}`);
});
