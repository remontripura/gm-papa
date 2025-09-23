import { z } from "zod";

export const addWalletSchema = z.object({
  amount: z.string().min(1, "Enter amount"),
});
