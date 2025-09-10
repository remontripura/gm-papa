import { z } from "zod";

export const addWalletSchema = z.object({
  amount: z.string().min(1, "Enter amount"),
  payment_id: z.string().min(1, "Enter payment id"),
  transaction_id: z.string().min(1, "Enter transaction id"),
  payment_number: z.string().min(1, "Enter payment number"),
});
