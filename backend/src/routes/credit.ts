import express from "express";
import creditService from "../services/credit.js";
import { userExtractor } from "../utils/middleware.js";
import { User, type UserType } from "../schemas/userSchema.js";
import { CreditEntry } from "../schemas/creditSchema.js";
import { type Request } from "express";
import z from "zod";

const router = express.Router();
interface reqHeader extends Request {
  user: UserType;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Credit:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the credit entry
 *         product:
 *           type: string
 *           description: Name of the product sold on credit
 *         buyer:
 *           type: string
 *           description: Name of the buyer
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date of the credit transaction
 *         quantity:
 *           type: number
 *           description: Quantity of products sold
 *         amountPaid:
 *           type: number
 *           description: Amount already paid by the buyer
 *         totalDebt:
 *           type: number
 *           description: Total debt amount
 *         status:
 *           type: string
 *           enum: [pending, settled]
 *           description: Status of the credit transaction
 *         receiptId:
 *           type: string
 *           description: Receipt identifier
 *     CreditEntry:
 *       type: object
 *       properties:
 *         product:
 *           type: string
 *           description: Name of the product sold on credit
 *         buyer:
 *           type: string
 *           description: Name of the buyer
 *         quantity:
 *           type: number
 *           description: Quantity of products sold
 *     PaymentRequest:
 *       type: object
 *       required:
 *         - id
 *         - amount
 *       properties:
 *         id:
 *           type: string
 *           description: Credit entry ID to make payment for
 *         amount:
 *           type: number
 *           description: Payment amount
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/credits:
 *   get:
 *     summary: Get all debts/credits for the authenticated user
 *     tags: [Credits]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all credit entries for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Credit'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get("/", userExtractor, async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const debts = await creditService.getDebts(user);
  res.status(200).json(debts);
});

/**
 * @swagger
 * /api/credits:
 *   post:
 *     summary: Create a new debt/credit entry
 *     tags: [Credits]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreditEntry'
 *     responses:
 *       201:
 *         description: Credit entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Credit'
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.post("/", userExtractor, async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const debt = CreditEntry.parse(req.body);
  const createdDebt = await creditService.createDebt(user, debt);
  res.status(201).json(createdDebt);
});

/**
 * @swagger
 * /api/credits/{id}:
 *   put:
 *     summary: Update/correct an existing debt/credit entry
 *     tags: [Credits]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Credit entry ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreditEntry'
 *     responses:
 *       200:
 *         description: Credit entry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Credit'
 *       400:
 *         description: Invalid request body or ID
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Credit entry not found
 */
router.put("/:id", userExtractor, async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const id = z.string().parse(req.params.id);
  const debt = CreditEntry.parse(req.body);
  const updatedDebt = await creditService.correctDebt(user, id, debt);
  res.status(200).json(updatedDebt);
});

/**
 * @swagger
 * /api/credits/total:
 *   get:
 *     summary: Get total debt amount for the authenticated user
 *     tags: [Credits]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Total debt amount
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalDebt:
 *                   type: number
 *                   description: Total outstanding debt amount
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get("/total", userExtractor, async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const totalDebt = await creditService.getTotalDebtsAmount(user);
  res.status(200).json(totalDebt);
});

/**
 * @swagger
 * /api/credits/{date}:
 *   get:
 *     summary: Get debts/credits by specific date
 *     tags: [Credits]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Date to filter credits by (ISO date format)
 *     responses:
 *       200:
 *         description: List of credit entries for the specified date
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Credit'
 *       400:
 *         description: Invalid date format
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get("/:date", userExtractor, async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const date = z.iso.date().parse(req.params.date);
  const debts = await creditService.findDebtByDate(user, date);
  res.status(200).json(debts);
});

/**
 * @swagger
 * /api/credits/buyer/{name}:
 *   get:
 *     summary: Get debts/credits by buyer name
 *     tags: [Credits]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the buyer to filter credits by
 *     responses:
 *       200:
 *         description: List of credit entries for the specified buyer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Credit'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get("/buyer/:name", userExtractor, async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const name = z.string().parse(req.params.name);
  const debts = await creditService.findDebtByBuyer(user, name);
  res.status(200).json(debts);
});
/**
 * @swagger
 * /api/credits/unique/{id}:
 *   get:
 *     summary: Get debt/credit by id
 *     tags: [Credits]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         id: id
 *         required: true
 *         schema:
 *           type: string
 *         description: id of the debt
 *     responses:
 *       200:
 *         description: credit entry for the specified buyer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Credit'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get("/unique/:id", userExtractor, async (req: reqHeader, res) => {
  const id = z.string().parse(req.params.id);
  const debt = await creditService.findDebtById(id);
  res.status(200).json(debt);
});

/**
 * @swagger
 * /api/credits/pay:
 *   post:
 *     summary: Make a payment towards a debt/credit
 *     tags: [Credits]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentRequest'
 *     responses:
 *       200:
 *         description: Payment processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Credit'
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Credit entry not found
 */
router.post("/pay", userExtractor, async (req: reqHeader, res) => {
  const input = z.object({ id: z.string(), amount: z.number() });
  const user = User.parse(req.user);
  if (!user) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  const { id, amount } = input.parse(req.body);
  const paidDebt = await creditService.payDebt(id, amount);
  return res.status(200).json(paidDebt);
});

export default router;
