import Credit from "../models/Credit.js";
import type { UserType } from "../schemas/userSchema.js";
import {
  type CreditEntryType,
  type CreditType,
} from "../schemas/creditSchema.js";
import Product from "../models/Product.js";
import type { ProductType } from "../schemas/productSchema.js";

const getDebts = async (user: UserType): Promise<CreditType[]> => {
  const debts = await Credit.find({ user: user.id });
  return debts.map((debt) => {
    return {
      id: debt._id.toString(),
      product: debt.product.toString(),
      date: debt.date,
      quantity: debt.quantity,
      totalDebt: debt.totalDebt,
      status: debt.status,
      receiptId: debt.receiptId,
      buyer: debt.buyer,
      amountPaid: debt.amountPaid,
    };
  });
};

const createDebt = async (
  user: UserType,
  debt: CreditEntryType
): Promise<CreditType> => {
  let isStockAvailable: boolean;
  const product = await Product.findById(debt.product);
  if (!product) throw new Error("product not found");
  if (product.stock >= debt.quantity) {
    isStockAvailable = true;
  } else isStockAvailable = false;
  if (isStockAvailable) {
    debt.buyer = debt.buyer.toLowerCase();
    const createdDebt = new Credit({
      user: user.id,
      ...debt,
    });
    product.stock -= debt.quantity;
    await product.save();
    await createdDebt.save();
    return {
      id: createdDebt._id.toString(),
      product: createdDebt.product.toString(),
      date: createdDebt.date,
      quantity: createdDebt.quantity,
      totalDebt: createdDebt.totalDebt,
      status: createdDebt.status,
      receiptId: createdDebt.receiptId,
      buyer: createdDebt.buyer,
      amountPaid: createdDebt.amountPaid,
    };
  } else throw new Error("Out of stock");
};

const findDebtByBuyer = async (
  user: UserType,
  buyer: string
): Promise<CreditType[]> => {
  const debts = await Credit.find({
    user: user.id,
    buyer: buyer.toLowerCase(),
  });
  return debts.map((debt) => {
    return {
      id: debt._id.toString(),
      product: debt.product.toString(),
      date: debt.date,
      quantity: debt.quantity,
      totalDebt: debt.totalDebt,
      status: debt.status,
      receiptId: debt.receiptId,
      buyer: debt.buyer,
      amountPaid: debt.amountPaid,
    };
  });
};
const findDebtById = async (id: string): Promise<CreditType> => {
  const debt = await Credit.findById(id);
  return {
    id: debt._id.toString(),
    product: debt.product.toString(),
    date: debt.date,
    quantity: debt.quantity,
    totalDebt: debt.totalDebt,
    status: debt.status,
    receiptId: debt.receiptId,
    buyer: debt.buyer,
    amountPaid: debt.amountPaid,
  };
};

const findDebtByDate = async (user: UserType, date: string) => {
  const day = new Date(date);

  const start = new Date(day);
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date(day);
  end.setUTCHours(23, 59, 59, 999);
  const debts = await Credit.find({
    user: user.id,
    date: { $gte: start, $lte: end },
  });
  return debts.map((debt) => {
    return {
      id: debt._id.toString(),
      product: debt.product.toString(),
      date: debt.date,
      quantity: debt.quantity,
      totalDebt: debt.totalDebt,
      status: debt.status,
      receiptId: debt.receiptId,
      buyer: debt.buyer,
      amountPaid: debt.amountPaid,
    };
  });
};

const payDebt = async (id: string, amount: number): Promise<CreditType> => {
  const debt = await Credit.findById(id);
  if (amount > debt.totalDebt) {
    throw new Error("payment exceeds debt");
  }
  if (debt.status !== "settled") {
    debt.amountPaid += amount;
    debt.totalDebt -= amount;
    if (debt.totalDebt <= 0) {
      debt.status = "settled";
    }
    await debt.save();
  } else {
    throw new Error("debt has already been settled");
  }
  return {
    id: debt._id.toString(),
    product: debt.product.toString(),
    date: debt.date,
    quantity: debt.quantity,
    totalDebt: debt.totalDebt,
    status: debt.status,
    receiptId: debt.receiptId,
    buyer: debt.buyer,
    amountPaid: debt.amountPaid,
  };
};

const getTotalDebtsAmount = async (user: UserType): Promise<number> => {
  const debts = await Credit.find({ user: user.id, status: "pending" });
  let total = 0;
  for (const debt of debts) {
    total += debt.totalDebt;
  }
  return total;
};

const correctDebt = async (
  user: UserType,
  id: string,
  debt: CreditEntryType
): Promise<CreditType> => {
  let isStockAvailable: boolean;
  const product = await Product.findById(debt.product);
  const initialDebt = await Credit.findById(id);
  if (!initialDebt) {
    throw new Error("Debt not found");
  }
  product.stock = initialDebt.quantity;
  if (product.stock >= debt.quantity) {
    isStockAvailable = true;
  } else isStockAvailable = false;
  if (isStockAvailable) {
    debt.buyer = debt.buyer.toLowerCase();
    const updatedDebt = await Credit.findOneAndUpdate(
      { _id: id },
      { user: user.id, ...debt },
      { new: true }
    ).populate<{ product: ProductType }>("product");
    if (!updatedDebt) {
      throw new Error("Debt not found");
    }
    product.stock -= updatedDebt.quantity;
    await product.save();

    updatedDebt.totalDebt -= updatedDebt.amountPaid;
    if (updatedDebt.totalDebt < 0) updatedDebt.totalDebt = 0;
    await updatedDebt.save();
    if (!updatedDebt) {
      throw new Error("Debt not found");
    }

    return {
      id: updatedDebt._id.toString(),
      product: updatedDebt.product.id.toString(),
      date: updatedDebt.date,
      quantity: updatedDebt.quantity,
      totalDebt: updatedDebt.totalDebt,
      status: updatedDebt.status,
      receiptId: updatedDebt.receiptId,
      buyer: updatedDebt.buyer,
      amountPaid: updatedDebt.amountPaid,
    };
  } else throw new Error("Out of stock");
};

export default {
  getDebts,
  createDebt,
  getTotalDebtsAmount,
  findDebtByDate,
  correctDebt,
  findDebtByBuyer,
  findDebtById,
  payDebt,
};
