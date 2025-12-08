import express from "express";
import userRouter from "./routes/user.js";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { errorHandler, unknownEndpoint } from "./utils/middleware.js";

const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/users", userRouter);

app.use(errorHandler);
app.use(unknownEndpoint);

export default app;
