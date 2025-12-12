import jwt from "jsonwebtoken";
import User from "../models/User.js";
import type { NextFunction, Request, Response } from "express";
import z from "zod";
import type { JwtPayload } from "jsonwebtoken";
import type { UserReturnType } from "../schemas/userSchema.js";

const errorHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error(error);

  if (error instanceof Error) {
    if (error instanceof z.ZodError) {
      return response.status(400).send({ error: error.issues });
    } else if (error.name === "CastError") {
      return response.status(400).json({ error: "malformed Id" });
    } else if (error.name === "ValidationError") {
      return response.status(400).json({ error: error.message });
    } else if (
      error.name === "MongoServerError" &&
      error.message.includes("E11000 duplicate key error")
    ) {
      return response
        .status(400)
        .json({ error: "expected `username` to be unique" });
    } else if (error.name === "JsonWebTokenError") {
      return response.status(401).json({ error: "token invalid" });
    } else if (error.name === "TokenExpiredError") {
      return response.status(401).json({
        error: "token expired",
      });
    }
  }
  return next(error);
};

const unknownEndpoint = (_req, res: Response) => {
  res.status(404).send({
    error: "unknown endpoint",
  });
};

interface Token extends Request {
  token?: string | null;
  user?: UserReturnType | null;
}

const tokenExtractor = (
  request: Token,
  _response: Response,
  next: NextFunction
) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer")) {
    request.token = authorization.replace("Bearer ", "");
  } else {
    request.token = null;
  }
  next();
};

interface JwtPayloadWithId extends JwtPayload {
  id: string;
}

const userExtractor = async (
  request: Token,
  _response: Response,
  next: NextFunction
) => {
  const decodedToken = jwt.verify(
    request.token,
    process.env.SECRET
  ) as JwtPayloadWithId;
  if (decodedToken.id) {
    const user = await User.findById(decodedToken.id);
    if (user.isVerified) {
      request.user = {
        id: user._id.toString(),
        details: user.details,
        products: user.products.toString(),
        sales: user.sales.toString(),
        credits: user.credits.toString(),
      };
    }
  } else {
    request.user = null;
  }
  next();
};

export { errorHandler, unknownEndpoint, tokenExtractor, userExtractor };
