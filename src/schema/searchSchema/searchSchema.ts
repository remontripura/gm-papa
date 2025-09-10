import { z } from "zod";

export const searchSchema = z.object({
  search: z.string().optional(),
});
export const subscribeSchema = z.object({
  email: z.string().email(),
});
export const couponSchema = z.object({
  mobile: z
    .string()
    .nonempty({ message: "Please enter your mobile number" })
    .regex(/^01[3-9]\d{8}$/, {
      message: "Please enter a valid mobile number",
    }),
});

