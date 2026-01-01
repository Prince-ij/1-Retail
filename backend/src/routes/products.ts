import express from "express";
import productService from "../services/products.js";
import { userExtractor } from "../utils/middleware.js";
import { User, type UserType } from "../schemas/userSchema.js";
import type { Request } from "express";
import { ProductEntry } from "../schemas/productSchema.js";
const router = express.Router();

interface reqHeader extends Request {
  user: UserType;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the product
 *         name:
 *           type: string
 *           description: Product name
 *         description:
 *           type: string
 *           description: Product description
 *         size:
 *           type: string
 *           description: Product size
 *         price:
 *           type: number
 *           description: Selling price of the product
 *         cost:
 *           type: number
 *           description: Cost price of the product
 *         supplier:
 *           type: string
 *           description: Product supplier
 *         stock:
 *           type: number
 *           description: Current stock quantity
 *     ProductEntry:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - cost
 *         - stock
 *       properties:
 *         name:
 *           type: string
 *           description: Product name
 *         description:
 *           type: string
 *           description: Product description
 *         size:
 *           type: string
 *           description: Product size
 *         price:
 *           type: number
 *           description: Selling price of the product
 *         cost:
 *           type: number
 *           description: Cost price of the product
 *         supplier:
 *           type: string
 *           description: Product supplier
 *         stock:
 *           type: number
 *           description: Current stock quantity
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products for the authenticated user
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all products for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
// fetch products
router.get("/", userExtractor, async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const products = await productService.getProducts(user);
  res.status(200).json(products);
});

/**
 * @swagger
 * /api/products/{name}:
 *   get:
 *     summary: Get a specific product by name
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Product name to search for
 *     responses:
 *       200:
 *         description: Product found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Product not found
 */
// find products
router.get("/:name", userExtractor, async (req: reqHeader, res) => {
  const name = req.params.name;
  const user = User.parse(req.user);
  const product = await productService.getProductByName(user, name);
  res.status(200).json(product);
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductEntry'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid request body or product already exists
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
// create products
router.post("/", userExtractor, async (req: reqHeader, res) => {
  const product = ProductEntry.parse(req.body);
  const user = User.parse(req.user);
  const savedProduct = await productService.newProduct(user, product);
  res.status(201).json(savedProduct);
});

/**
 * @swagger
 * /api/products:
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductEntry'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Product not found
 */
// update products
router.put("/", userExtractor, async (req: reqHeader, res) => {
  const product = ProductEntry.parse(req.body);
  const user = User.parse(req.user);
  const updatedProduct = await productService.updateProduct(user, product);
  res.status(200).json(updatedProduct);
});

/**
 * @swagger
 * /api/products/{name}:
 *   delete:
 *     summary: Delete a product by name
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Product name to delete
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Product not found
 */
// delete products
router.delete("/:name", userExtractor, async (req: reqHeader, res) => {
  const name = req.params.name;
  const user = User.parse(req.user);
  const deletedProduct = await productService.deleteProduct(user, name);
  res.status(204).json(deletedProduct);
});

export default router;
