import z from "zod";

const User = z.object({
  id: z.string(),
  details: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.email(),
  }),
  password: z.string(),
  products: z.string(),
  sales: z.string(),
  credits: z.string(),
});

//eslint-disable-next-line
const UserEntry = User.pick({
  details: true,
  password: true,
});

//eslint-disable-next-line
const UserReturn = User.omit({
  password: true,
});

export type UserType = z.infer<typeof User>;
export type UserEntryType = z.infer<typeof UserEntry>;
export type UserReturnType = z.infer<typeof UserReturn>;
