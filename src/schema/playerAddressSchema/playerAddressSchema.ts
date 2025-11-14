import { z } from "zod";

export const playerAddressSchema = (
  loggedIn: boolean,
  wallet: boolean,
  phoneAllow: boolean,
  transactionAllow: boolean
) =>
  z.object({
    name: loggedIn
      ? z.string().optional()
      : z.string().min(1, "Enter your name"),

    phone: loggedIn
      ? z.string().optional()
      : z.string().regex(/^\d{11}$/, "Enter valid phone number"),

    email: loggedIn ? z.string().optional() : z.string().optional(),

    number:
      wallet || phoneAllow
        ? z.string().optional()
        : z.string().regex(/^\d{11}$/, "Enter valid phone number"),

    transaction_id: wallet || transactionAllow
      ? z.string().optional()
      : z.string().min(1, "Enter transaction id"),

    method_id: z.string(),
  });
