import express from "express";
import userService from "../services/user.js";
import {
  UserEntry,
  LogInEntry,
  PasswordResetEntry,
  EmailVerifyEntry,
} from "../schemas/userSchema.js";

const router = express.Router();

// Get a User
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userService.getUser(id);
  res.status(200).json(user);
});

// Get all users
router.get("/", async (_req, res) => {
  const users = await userService.getUsers();
  res.status(200).json(users);
});

// Create new user
router.post("/", async (req, res) => {
  const userDetails = UserEntry.parse(req.body);
  const user = await userService.createUser(userDetails);
  await userService.sendVerifyLink(user.id);
  res.status(201).json(user);
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = LogInEntry.parse(req.body);
  const token = await userService.logIn(email, password);
  res.status(200).json({ token: token });
});

// send reset link
router.get("/reset-link/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await userService.sendResetLink(id);
    res.status(200).json({ message: "link sent successful" });
  } catch (err) {
    res.status(500).json({ msg: `failed to send link with ${err}` });
  }
});


// reset password
router.post("/reset", async (req, res) => {
  const { email, password, token } = PasswordResetEntry.parse(req.body);
  const user = await userService.resetPassword(email, password, token);
  res.status(200).json(user);
});

// verify email
router.get("/verify-email/:id/:token", async (req, res) => {
  const { id, token } = EmailVerifyEntry.parse(req.params);
  await userService.verifyEmail(id, token);
  res.status(200).json({ msg: "verified successful" });
});

export default router;
