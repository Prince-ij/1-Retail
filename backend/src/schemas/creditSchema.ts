import z from "zod";

const Status = z.enum(["pending", "settled"]);

export const Credit = z.object({
  id: z.string(),
  product: z.string(),
  buyer: z.string().optional(),
  date: z.date().optional(),
  quantity: z.number(),
  amountPaid: z.number().optional(),
  totalDebt: z.number().optional(),
  status: Status.optional(),
  receiptId: z.string().optional(),
});

export const CreditEntry = Credit.omit({
  id: true,
});

export type CreditType = z.infer<typeof Credit>;
export type CreditEntryType = z.infer<typeof CreditEntry>;
