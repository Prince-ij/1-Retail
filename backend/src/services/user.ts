import jwt from "jsonwebtoken";
import type { UserReturnType, UserEntryType } from "../schemas/userSchema.js";
import dotenv from "dotenv";
import User from "../models/User.js";
import crypto from "crypto";
import sendMail, { type MAILOPTIONS } from "../utils/emailer.js";
import logger from "../utils/logger.js";

dotenv.config();

const createUser = async (user: UserEntryType): Promise<UserReturnType> => {
  const newUser = new User(user);
  const savedUser = await newUser.save();
  return {
    id: savedUser._id.toString(),
    details: savedUser.details,
    products: savedUser.products.toString(),
    sales: savedUser.sales.toString(),
    credits: savedUser.credits.toString(),
  };
};

const logIn = async (email: string, password: string): Promise<string> => {
  const user = await User.findOne({ "details.email": email });
  if (user && password) {
    const userForToken = {
      username: `${user.details.firstName}  ${user.details.lastName}`,
      id: user.id,
    };
    // eslint-disable-next-line
    const token: string = jwt.sign(userForToken, process.env.JWT_SECRET, {
      expiresIn: 24,
    }) as string;
    return token;
  } else {
    throw new Error("Incorrect credentials");
  }
};

const getUser = async (id: string): Promise<UserReturnType> => {
  const user = await User.findById(id);
  return {
    id: user._id.toString(),
    details: user.details,
    products: user.products.toString(),
    sales: user.sales.toString(),
    credits: user.credits.toString(),
  };
};

const getUsers = async (): Promise<UserReturnType[]> => {
  const users = User.find({});
  return (await users).map((user) => {
    return {
      id: user._id.toString(),
      details: user.details,
      products: user.products.toString(),
      sales: user.sales.toString(),
      credits: user.credits.toString(),
    };
  });
};

const resetPassword = async (
  email: string,
  password: string,
  token: string
): Promise<UserReturnType> => {
  const user = await User.findOne({ "details.email": email });
  if (!user) {
    throw new Error("User does not exists");
  }
  if (user.tokenExpired && new Date() > user.tokenExpired) {
    throw new Error("Reset password link expired");
  }
  if (user.verificationToken === token) {
    user.password = password;
    user.verificationToken = undefined;
    user.tokenExpired = undefined;
    await user.save();
  }

  return {
    id: user._id.toString(),
    details: user.details,
    products: user.products.toString(),
    sales: user.sales.toString(),
    credits: user.credits.toString(),
  };
};

const sendResetLink = async (id: string): Promise<boolean> => {
  const user = await User.findById(id);
  user.verificationToken = crypto.randomBytes(32).toString("hex");
  user.tokenExpired = new Date(Date.now() + 60 * 60 * 1000);
  await user.save();
  const verificationLink = `${process.env.FRONT_END_HOST}/${user.id}/${user.details.email}/${user.verificationToken}`;
  const mailOptions: MAILOPTIONS = {
    from: "1-Retail",
    to: user.details.email,
    subject: "Reset Your Password",
    text: `Click the link to reset your password: ${verificationLink}`,
  };
  try {
    await sendMail(mailOptions);
    logger.info(`reset email successfully sent for ${user.details.email}`);
    return true;
  } catch (err) {
    throw new Error(`${err} occured`);
  }
};
const sendVerifyLink = async (id: string): Promise<boolean> => {
  const user = await User.findById(id);
  const verificationLink = `${process.env.FRONT_END_HOST}/${user.id}/${user.verificationToken}`;
  const mailOptions: MAILOPTIONS = {
    from: "1-Retail",
    to: user.details.email,
    subject: "Verify Email",
    text: `Click the link to verify your account: ${verificationLink}`,
  };
  try {
    await sendMail(mailOptions);
    logger.info(`verify email successfully sent for ${user.details.email}`);
    return true;
  } catch (err) {
    throw new Error(`${err} occured`);
  }
};

const verifyEmail = async (userId: string, token: string): Promise<boolean> => {
  const user = await User.findById(userId);
  if (!user) {
    return false;
  }
  if (user.tokenExpired && new Date() > user.tokenExpired) {
    return false;
  }

  if (user.verificationToken === token) {
    user.isVerified = true;
    user.verificationToken = undefined;
    user.tokenExpired = undefined;
    await user.save();
    return true;
  }

  return false;
};

export default {
  createUser,
  logIn,
  getUser,
  getUsers,
  resetPassword,
  verifyEmail,
  sendResetLink,
  sendVerifyLink,
};
