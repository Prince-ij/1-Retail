import express from "express";
import saleService from "../services/sales.js";
import { userExtractor } from "../utils/middleware.js";
import { SalesEntry } from "../schemas/salesSchema.js";
import type { UserType } from "../schemas/userSchema.js";
import { User } from "../schemas/userSchema.js";
import z from "zod";
import { type Request } from "express";

const router = express.Router();
interface reqHeader extends Request {
  user: UserType;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Sales:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the sales transaction
 *         product:
 *           type: string
 *           description: Name of the product sold
 *         buyer:
 *           type: string
 *           description: Name of the buyer
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date of the sales transaction
 *         quantity:
 *           type: number
 *           description: Quantity of products sold
 *         totalPrice:
 *           type: number
 *           description: Total price of the sale
 *         receiptId:
 *           type: string
 *           description: Receipt identifier
 *     SalesEntry:
 *       type: object
 *       required:
 *         - product
 *         - buyer
 *         - quantity
 *       properties:
 *         product:
 *           type: string
 *           description: Name of the product sold
 *         buyer:
 *           type: string
 *           description: Name of the buyer
 *         quantity:
 *           type: number
 *           description: Quantity of products sold
 *     ProfitResponse:
 *       type: object
 *       properties:
 *         totalProfit:
 *           type: number
 *           description: Total profit amount
 *         date:
 *           type: string
 *           format: date
 *           description: Date for the profit calculation
 *     SalesTotalResponse:
 *       type: object
 *       properties:
 *         totalSales:
 *           type: number
 *           description: Total sales amount
 *         date:
 *           type: string
 *           format: date
 *           description: Date for the sales calculation
 */

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Get all sales for the authenticated user
 *     tags: [Sales]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all sales for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sales'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get("/", userExtractor, async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const sales = await saleService.getSales(user);
  res.status(200).json(sales);
});

/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Create a new sales transaction
 *     tags: [Sales]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SalesEntry'
 *     responses:
 *       201:
 *         description: Sale created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sales'
 *       400:
 *         description: Invalid request body or insufficient stock
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.post("/", userExtractor, async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const sale = SalesEntry.parse(req.body);
  const madeSale = await saleService.makeSale(user, sale);
  res.status(201).json(madeSale);
});

/**
 * @swagger
 * /api/sales/{id}:
 *   put:
 *     summary: Update/correct an existing sales transaction
 *     tags: [Sales]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sales transaction ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SalesEntry'
 *     responses:
 *       200:
 *         description: Sale updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sales'
 *       400:
 *         description: Invalid request body or ID
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Sales transaction not found
 */
router.put("/:id", userExtractor, async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const id = req.params.id;
  const sale = SalesEntry.parse(req.body);

  const updatedSale = await saleService.correctSale(id, user, sale);
  res.status(200).json(updatedSale);
});

/**
 * @swagger
 * /api/sales/profit/{date}:
 *   get:
 *     summary: Get total profit by specific date
 *     tags: [Sales]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Date to calculate profit for (ISO date format)
 *     responses:
 *       200:
 *         description: Total profit for the specified date
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfitResponse'
 *       400:
 *         description: Invalid date format
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get("/profit/:date", async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const date = z.iso.date().parse(req.params.date);
  const profit = await saleService.getTotalProfitByDate(user, date);
  res.status(200).json(profit);
});

/**
 * @swagger
 * /api/sales/{date}:
 *   get:
 *     summary: Get sales transactions by specific date
 *     tags: [Sales]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Date to filter sales by (ISO date format)
 *     responses:
 *       200:
 *         description: List of sales for the specified date
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sales'
 *       400:
 *         description: Invalid date format
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get("/:date", async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const date = z.iso.date().parse(req.params.date);
  const sales = await saleService.findSalesByDate(user, date);
  res.status(200).json(sales);
});

/**
 * @swagger
 * /api/sales/total/{date}:
 *   get:
 *     summary: Get total sales amount by specific date
 *     tags: [Sales]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Date to calculate total sales for (ISO date format)
 *     responses:
 *       200:
 *         description: Total sales amount for the specified date
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SalesTotalResponse'
 *       400:
 *         description: Invalid date format
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get("/total/:date", async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const date = z.iso.date().parse(req.params.date);
  const total = await saleService.getTotalSalesByDate(user, date);
  res.status(200).json(total);
});

/**
 * @swagger
 * /api/sales/buyer/{buyer}:
 *   get:
 *     summary: Get sales transactions by buyer name
 *     tags: [Sales]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: buyer
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the buyer to filter sales by
 *     responses:
 *       200:
 *         description: List of sales for the specified buyer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sales'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get("/buyer/:buyer", async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const buyer = z.string().parse(req.params.buyer);
  const sales = await saleService.findSalesByBuyer(user, buyer);
  res.status(200).json(sales);
});

/**
 * @swagger
 * /api/sales/product/{name}:
 *   get:
 *     summary: Get sales transactions by product name
 *     tags: [Sales]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the product to filter sales by
 *     responses:
 *       200:
 *         description: List of sales for the specified product
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sales'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get("/product/:name", async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const name = z.string().parse(req.params.name);
  const sales = await saleService.findSalesByProduct(user, name);
  res.status(200).json(sales);
});

export default router;
