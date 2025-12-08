import z from "zod";

export enum Status {
  settled = "settled",
  pending = "pending",
}

export const Credit = z.object({
  id: z.string(),
  product: z.string(),
  buyer: z.string().optional(),
  date: z.iso.datetime(),
  quantity: z.number(),
  amountPaid: z.number().optional(),
  totalDebt: z.number(),
  status: z.enum(Status),
  recieptId: z.string(),
});
