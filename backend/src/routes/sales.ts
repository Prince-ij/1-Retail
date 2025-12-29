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

router.get("/", userExtractor, async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const sales = await saleService.getSales(user);
  res.status(200).json(sales);
});

router.post("/", userExtractor, async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const sale = SalesEntry.parse(req.body);
  const madeSale = await saleService.makeSale(user, sale);
  res.status(201).json(madeSale);
});

router.put("/:id", userExtractor, async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const id = req.params.id;
  const sale = SalesEntry.parse(req.body);

  const updatedSale = await saleService.correctSale(id, user, sale);
  res.status(200).json(updatedSale);
});

router.get("/profit/:date", async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const date = z.iso.date().parse(req.params.date);
  const profit = await saleService.getTotalProfitByDate(user, date);
  res.status(200).json(profit);
});

router.get("/:date", async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const date = z.iso.date().parse(req.params.date);
  const sales = await saleService.findSalesByDate(user, date);
  res.status(200).json(sales);
});

router.get("/total/:date", async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const date = z.iso.date().parse(req.params.date);
  const total = await saleService.getTotalSalesByDate(user, date);
  res.status(200).json(total);
});

router.get("/buyer/:buyer", async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const buyer = z.string().parse(req.params.buyer);
  const sales = await saleService.findSalesByBuyer(user, buyer);
  res.status(200).json(sales);
});

router.get("/product/:name", async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const name = z.string().parse(req.params.name);
  const sales = await saleService.findSalesByProduct(user, name);
  res.status(200).json(sales);
});

export default router;
