import { z } from "zod";

export const addWalletSchema = z.object({
  amount: z
    .string({ required_error: "Please enter an amount" })
    .min(100, { message: "Amount must be at least 100" })
    .max(5000, { message: "Amount cannot exceed 5000" }),
});
