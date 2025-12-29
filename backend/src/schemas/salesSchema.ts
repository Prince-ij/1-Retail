import z from "zod";

export const Sales = z.object({
  id: z.string(),
  product: z.string(),
  buyer: z.string(),
  date: z.date(),
  quantity: z.number(),
  totalPrice: z.number(),
  receiptId: z.string(),
});

export const SalesEntry = Sales.omit({
  id: true,
  receiptId: true,
  totalPrice: true,
  date: true,
});

export type SalesType = z.infer<typeof Sales>;
export type SalesEntryType = z.infer<typeof SalesEntry>;
