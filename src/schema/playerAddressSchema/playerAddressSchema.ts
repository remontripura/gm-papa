import { z } from "zod";

export const playerAddressSchema = (loggedIn: boolean, wallet: boolean) =>
  z.object({
    name: loggedIn
      ? z.string().optional()
      : z.string().min(1, "Enter your name"),

    phone: loggedIn
      ? z.string().optional()
      : z.string().min(1, "Enter your phone number"),

    email: loggedIn
      ? z.string().optional()
      : z.string().email("Enter valid email"),

    number: wallet
      ? z.string().optional()
      : z.string().regex(/^\d{11}$/, "Enter valid phone number"),

    transaction_id: wallet
      ? z.string().optional()
      : z.string().min(1, "Enter transaction id"),

    method_id: z.string(),
  });
