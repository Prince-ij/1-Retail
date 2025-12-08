import z from "zod";

export const Product = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  size: z.string().optional(),
  price: z.number(),
  cost: z.number(),
  supplier: z.string().optional(),
  stock: z.number()
});
