import User from "../models/User.js";
import userService from "../services/user.js";
import productService from "../services/products.js";
import jwt, { type JwtPayload } from "jsonwebtoken";

// create user
export const createUser = async () => {
  const test_user = {
    details: {
      firstName: "Zarabozo",
      lastName: "Dimitriv",
      email: "princeij56@gmail.com",
    },
    password: "woohoo123",
  };

  const newUser = await userService.createUser(test_user);
  const user = await User.findById(newUser.id);
  user.isVerified = true;
  await user.save();
  return user;
};

// loginUser
export const loginUser = async () => {
  const user = await userService.logIn("princeij56@gmail.com", "woohoo123");
  return user.token;
};

export const createProducts = async (): Promise<string[]> => {
  const flour = {
    name: "flour",
    description: "one bag of flour",
    size: "small",
    price: 10000,
    cost: 5000,
    supplier: "Sempene Stores",
    stock: 25,
  };
  const yam = {
    name: "yam",
    description: "one tuber of yam",
    price: 2500,
    cost: 1500,
    supplier: "Awere market",
    stock: 50,
  };
  const token = await loginUser();
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
  const db_user = await User.findById(decodedToken.id);
  const user = {
    id: db_user._id.toString(),
    details: db_user.details,
  };
  const ids: string[] = [];
  ids.push((await productService.newProduct(user, yam)).id);
  ids.push((await productService.newProduct(user, flour)).id);
  return ids;
};
