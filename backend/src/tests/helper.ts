import User from "../models/User.js";
import userService from "../services/user.js";

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
  const token = await userService.logIn("princeij56@gmail.com", "woohoo123");
  return token;
};
