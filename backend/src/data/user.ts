import User from "../models/User.js";
import type { UserEntryType, UserReturnType } from "../schemas/userSchema.js";

const getUsers = async (): Promise<UserReturnType[]> => {
  return await User.find({});
};

const getUser = async (id: string): Promise<UserReturnType> => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return {
    id: user._id.toString(),
    details: user.details,
    products: user.products.toString(),
    sales: user.sales.toString(),
    credits: user.credits.toString(),
  };
};

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

const findUserByEmail = async (
  email: string
): Promise<UserReturnType | null> => {
  const user = await User.findOne({ email });
  if (user) {
    return {
      id: user._id.toString(),
      details: user.details,
      products: user.products.toString(),
      sales: user.sales.toString(),
      credits: user.credits.toString(),
    };
  } else {
    return null;
  }
};

export default { getUsers, getUser, createUser, findUserByEmail };
