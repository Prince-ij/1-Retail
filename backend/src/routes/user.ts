import express from "express";
import userService from "../services/user.js";
import {
  UserEntry,
  LogInEntry,
  PasswordResetEntry,
  EmailVerifyEntry,
} from "../schemas/userSchema.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the user
 *         details:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *               description: User's first name
 *             lastName:
 *               type: string
 *               description: User's last name
 *             email:
 *               type: string
 *               format: email
 *               description: User's email address
 *     UserEntry:
 *       type: object
 *       required:
 *         - details
 *         - password
 *       properties:
 *         details:
 *           type: object
 *           required:
 *             - firstName
 *             - lastName
 *             - email
 *           properties:
 *             firstName:
 *               type: string
 *               description: User's first name
 *             lastName:
 *               type: string
 *               description: User's last name
 *             email:
 *               type: string
 *               format: email
 *               description: User's email address
 *         password:
 *           type: string
 *           description: User's password
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           description: User's password
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT authentication token
 *     PasswordResetRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - token
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           description: New password
 *         token:
 *           type: string
 *           description: Password reset token
 *     MessageResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Response message
 *         msg:
 *           type: string
 *           description: Response message
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a specific user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userService.getUser(id);
  res.status(200).json(user);
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", async (_req, res) => {
  const users = await userService.getUsers();
  res.status(200).json(users);
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user account
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserEntry'
 *     responses:
 *       201:
 *         description: User created successfully. Verification email sent.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request body or user already exists
 */
router.post("/", async (req, res) => {
  const userDetails = UserEntry.parse(req.body);
  const user = await userService.createUser(userDetails);
  await userService.sendVerifyLink(user.id);
  res.status(201).json(user);
});

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user and get authentication token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Invalid credentials
 *       401:
 *         description: Email not verified or account not activated
 */
router.post("/login", async (req, res) => {
  const { email, password } = LogInEntry.parse(req.body);
  const user = await userService.logIn(email, password);
  res.status(200).json(user);
});

/**
 * @swagger
 * /api/users/reset-link/{email}:
 *   get:
 *     summary: Send password reset link to user's email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: User Email
 *     responses:
 *       200:
 *         description: Reset link sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to send reset link
 */
router.get("/reset-link/:email", async (req, res) => {
  const id = req.params.email;
  try {
    await userService.sendResetLink(id);
    res.status(200).json({ message: "link sent successful" });
  } catch (err) {
    res.status(500).json({ msg: `failed to send link with ${err}` });
  }
});

/**
 * @swagger
 * /api/users/reset:
 *   post:
 *     summary: Reset user password using reset token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PasswordResetRequest'
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid token or request body
 *       404:
 *         description: User not found
 */
router.post("/reset", async (req, res) => {
  const { email, password, token } = PasswordResetEntry.parse(req.body);
  const user = await userService.resetPassword(email, password, token);
  res.status(200).json(user);
});

/**
 * @swagger
 * /api/users/verify-email/{id}/{token}:
 *   get:
 *     summary: Verify user email address using verification token
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Email verification token
 *     responses:
 *       200:
 *         description: Email verification successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       400:
 *         description: Invalid token or user ID
 *       404:
 *         description: User not found
 */
router.get("/verify-email/:id/:token", async (req, res) => {
  const { id, token } = EmailVerifyEntry.parse(req.params);
  await userService.verifyEmail(id, token);
  res.status(200).json({ msg: "verified successful" });
});

export default router;
