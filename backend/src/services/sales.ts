import Sales from "../models/Sales.js";
import Product from "../models/Product.js";
import type { UserType } from "../schemas/userSchema.js";
import type { SalesEntryType, SalesType } from "../schemas/salesSchema.js";
import productService from "./products.js";
import { type ProductType } from "../schemas/productSchema.js";

const getSales = async (user: UserType): Promise<SalesType[]> => {
  const sales = await Sales.find({ user: user.id });
  return sales.map((sale) => {
    return {
      id: sale._id.toString(),
      product: sale.product.toString(),
      buyer: sale.buyer,
      date: sale.date,
      quantity: sale.quantity,
      totalPrice: sale.totalPrice,
      receiptId: sale.receiptId,
    };
  });
};

const getTotalProfitByDate = async (
  user: UserType,
  date: string
): Promise<number> => {
  const day = new Date(date);

  const start = new Date(day);
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date(day);
  end.setUTCHours(23, 59, 59, 999);
  const sales = await Sales.find({
    user: user.id,
    date: { $gte: start, $lte: end },
  }).populate<{ product: ProductType }>("product");

  let totalPrice = 0;
  let totalCost = 0;
  sales.forEach((sale) => {
    totalCost += sale.product.cost * sale.quantity;
  });
  sales.forEach((sale) => {
    totalPrice += sale.totalPrice;
  });
  return totalPrice - totalCost;
};

const getTotalSalesByDate = async (
  user: UserType,
  date: string
): Promise<number> => {
  const day = new Date(date);

  const start = new Date(day);
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date(day);
  end.setUTCHours(23, 59, 59, 999);

  return await Sales.countDocuments({
    user: user.id,
    date: { $gte: start, $lte: end },
  });
};

const findSalesByProduct = async (
  user: UserType,
  name: string
): Promise<SalesType[]> => {
  const product = await productService.getProductByName(name, user);
  const sales = await Sales.find({
    user: user.id,
    product: product.id,
  });
  return sales.map((sale) => {
    return {
      id: sale._id.toString(),
      product: sale.product.toString(),
      buyer: sale.buyer,
      date: sale.date,
      quantity: sale.quantity,
      totalPrice: sale.totalPrice,
      receiptId: sale.receiptId,
    };
  });
};

const findSalesByBuyer = async (
  user: UserType,
  buyer: string
): Promise<SalesType[]> => {
  const sales = await Sales.find({ user: user.id, buyer: buyer.toLowerCase() });
  return sales.map((sale) => {
    return {
      id: sale._id.toString(),
      product: sale.product.toString(),
      buyer: sale.buyer,
      date: sale.date,
      quantity: sale.quantity,
      totalPrice: sale.totalPrice,
      receiptId: sale.receiptId,
    };
  });
};

const getSaleById = async (id: string): Promise<SalesType> => {
  const sale = await Sales.findById(id);
  return {
    id: sale._id.toString(),
    product: sale.product.toString(),
    buyer: sale.buyer,
    date: sale.date,
    quantity: sale.quantity,
    totalPrice: sale.totalPrice,
    receiptId: sale.receiptId,
  };
};

const findSalesByDate = async (
  user: UserType,
  date: string
): Promise<SalesType[]> => {
  const day = new Date(date);

  const start = new Date(day);
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date(day);
  end.setUTCHours(23, 59, 59, 999);
  const sales = await Sales.find({
    user: user.id,
    date: { $gte: start, $lte: end },
  });
  return sales.map((sale) => {
    return {
      id: sale._id.toString(),
      product: sale.product.toString(),
      buyer: sale.buyer,
      date: sale.date,
      quantity: sale.quantity,
      totalPrice: sale.totalPrice,
      receiptId: sale.receiptId,
    };
  });
};

const makeSale = async (
  user: UserType,
  sale: SalesEntryType
): Promise<SalesType> => {
  let isStockAvailable: boolean;
  const product = await Product.findById(sale.product);
  if (product.stock >= sale.quantity) {
    isStockAvailable = true;
  } else isStockAvailable = false;
  if (isStockAvailable) {
    sale.buyer = sale.buyer.toLowerCase();
    const newSale = new Sales({ user: user.id, ...sale });
    await newSale.save();
    product.stock -= sale.quantity;
    await product.save();
    return {
      id: newSale._id.toString(),
      product: newSale.product.toString(),
      buyer: newSale.buyer,
      date: newSale.date,
      quantity: newSale.quantity,
      totalPrice: newSale.totalPrice,
      receiptId: newSale.receiptId,
    };
  } else throw new Error("Out of Stock");
};

const correctSale = async (
  id: string,
  user: UserType,
  sale: SalesEntryType
): Promise<SalesType> => {
  sale.buyer = sale.buyer.toLowerCase();
  let isStockAvailable: boolean;
  const product = await Product.findById(sale.product);
  const initialSale = await Sales.findById(id);
  product.stock = initialSale.quantity;
  await product.save();
  if (product.stock >= sale.quantity) {
    isStockAvailable = true;
  } else isStockAvailable = false;
  if (isStockAvailable) {
    const updatedSale = await Sales.findOneAndUpdate(
      { _id: id },
      { user: user.id, ...sale },
      { new: true }
    ).populate<{ product: ProductType }>("product");

    product.stock -= updatedSale.quantity;
    await product.save();

    await updatedSale.save();

    return {
      id: updatedSale._id.toString(),
      product: updatedSale.product.id.toString(),
      buyer: updatedSale.buyer,
      date: updatedSale.date,
      quantity: updatedSale.quantity,
      totalPrice: updatedSale.totalPrice,
      receiptId: updatedSale.receiptId,
    };
  } else throw new Error("out of stock");
};

export default {
  makeSale,
  getSales,
  getTotalProfitByDate,
  getTotalSalesByDate,
  correctSale,
  findSalesByBuyer,
  getSaleById,
  findSalesByDate,
  findSalesByProduct,
};
