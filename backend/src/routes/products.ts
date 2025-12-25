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
// fetch products
router.get("/", userExtractor, async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const products = await productService.getProducts(user);
  res.status(200).json(products);
});

// find products
router.get("/:name", userExtractor, async (req: reqHeader, res) => {
  const name = req.params.name;
  const user = User.parse(req.user);
  const product = await productService.getProductByName(user, name);
  res.status(200).json(product);
});

// create products

router.post("/", userExtractor, async (req: reqHeader, res) => {
  const product = ProductEntry.parse(req.body);
  const user = User.parse(req.user);
  const savedProduct = await productService.newProduct(user, product);
  res.status(201).json(savedProduct);
});

// update products
router.put("/", userExtractor, async (req: reqHeader, res) => {
  const product = ProductEntry.parse(req.body);
  const user = User.parse(req.user);
  const updatedProduct = await productService.updateProduct(user, product);
  res.status(200).json(updatedProduct);
});

// delete products
router.delete("/:name", userExtractor, async (req: reqHeader, res) => {
  const name = req.params.name;
  const user = User.parse(req.user);
  const deletedProduct = await productService.deleteProduct(user, name);
  res.status(204).json(deletedProduct);
});

export default router;
