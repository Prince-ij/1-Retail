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

router.get("/", userExtractor, async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const debts = await creditService.getDebts(user);
  res.status(200).json(debts);
});

router.post("/", userExtractor, async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const debt = CreditEntry.parse(req.body);
  const createdDebt = await creditService.createDebt(user, debt);
  res.status(201).json(createdDebt);
});

router.put("/:id", userExtractor, async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const id = z.string().parse(req.params.id);
  const debt = CreditEntry.parse(req.body);
  const updatedDebt = await creditService.correctDebt(user, id, debt);
  res.status(200).json(updatedDebt);
});

router.get("/total", userExtractor, async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const totalDebt = await creditService.getTotalDebtsAmount(user);
  res.status(200).json(totalDebt);
});

router.get("/:date", userExtractor, async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const date = z.iso.date().parse(req.params.date);
  const debts = await creditService.findDebtByDate(user, date);
  res.status(200).json(debts);
});

router.get("/buyer/:name", userExtractor, async (req: reqHeader, res) => {
  const user = User.parse(req.user);
  const name = z.string().parse(req.params.name);
  const debts = await creditService.findDebtByBuyer(user, name);
  res.status(200).json(debts);
});

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
