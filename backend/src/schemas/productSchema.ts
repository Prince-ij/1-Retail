import z from "zod";

export const Product = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  size: z.string().optional(),
  price: z.number(),
  cost: z.number(),
  supplier: z.string().optional(),
  stock: z.number(),
});

export const ProductEntry = Product.omit({
  id: true,
});

export type ProductEntryType = z.infer<typeof ProductEntry>;
export type ProductType = z.infer<typeof Product>;
