import userData from "../data/user.js";
// import jwt from "jsonwebtoken";
import type { UserReturnType, UserEntryType } from "../schemas/userSchema.js";
import dotenv from "dotenv";

dotenv.config();

const createUser = async (user: UserEntryType): Promise<UserReturnType> => {
  const newUser = await userData.createUser(user);
  return newUser;
};

// const logIn = async (email: string, password: string): Promise<string> => {
//   const user = await userData.findUserByEmail(email);
//   if (user && password) {
//     const userForToken = {
//       username: `${user.details.firstName}  ${user.details.lastName}`,
//       id: user.id,
//       isVerified: false,
//     };
//     const token: string = jwt.sign(
//       userForToken,
//       process.env.JWT_SECRET
//     ) as string;
//     return token;
//   } else {
//     throw new Error("Incorrect credentials");
//   }
// };

const getUser = async (id: string): Promise<UserReturnType> => {
  return await userData.getUser(id);
};

const getUsers = async (): Promise<UserReturnType[]> => {
  return await userData.getUsers();
};

const changePassword = () => {
  return null;
};

const verifyEmail = () => {};

export default { createUser, /*logIn*/ getUser, getUsers, changePassword, verifyEmail };
