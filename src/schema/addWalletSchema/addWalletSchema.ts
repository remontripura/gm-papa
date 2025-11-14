import { z } from "zod";

// export const addWalletSchema = (phoneAllow: boolean) =>
//   z.object({
//     amount: z.string().min(1, "Enter amount"),
//     payment_id: z.string().min(1, "Enter payment id"),
//     transaction_id: z.string().min(1, "Enter transaction id"),
//     payment_number: z.string().min(1, "Enter payment number"),
//   });

export const WalletSchema = (phoneAllow: boolean, transactionAllow: boolean) =>
  z.object({
    amount: z.string().min(1, "Enter amount"),
    payment_id: z.string().min(1, "Enter payment id"),
    transaction_id:
      phoneAllow || transactionAllow
        ? z.string().optional()
        : z.string().min(1, "Enter transaction id"),
    payment_number:
      phoneAllow || transactionAllow
        ? z.string().optional()
        : z.string().regex(/^\d{11}$/, "Enter valid phone number"),
  });
