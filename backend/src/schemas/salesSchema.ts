import z from "zod";

export const Sales = {
  id: z.string(),
  product: z.string(),
  buyer: z.string(),
  date: z.string(),
  quantity: z.number(),
  totalPrice: z.number(),
  recieptId: z.string(),
};
