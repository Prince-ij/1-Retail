import z from "zod";

export const User = z.object({
  id: z.string(),
  details: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.email(),
  }),
});

export const UserEntry = z.object({
  details: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.email(),
  }),
  password: z.string(),
});

export const LogInEntry = z.object({
  email: z.string(),
  password: z.string(),
});

export const PasswordResetEntry = z.object({
  email: z.string(),
  password: z.string(),
  token: z.string(),
});

export const EmailVerifyEntry = z.object({
  id: z.string(),
  token: z.string(),
});


export type UserType = z.infer<typeof User>;
export type UserEntryType = z.infer<typeof UserEntry>;
