import express from "express";
import userRouter from "./routes/user.js";
import productRouter from "./routes/products.js";
import salesRouter from "./routes/sales.js";
import creditRouter from "./routes/credit.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./utils/swagger.js";

import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import {
  errorHandler,
  tokenExtractor,
  unknownEndpoint,
  userExtractor,
} from "./utils/middleware.js";

const app = express();
app.use(express.json());
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("tiny"));
}
app.use(cors());
app.use(helmet());
app.use(tokenExtractor);
app.use(userExtractor);

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec as swaggerUi.JsonObject)
);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/sales", salesRouter);
app.use("/api/credits", creditRouter);

app.use(errorHandler);
app.use(unknownEndpoint);

export default app;
