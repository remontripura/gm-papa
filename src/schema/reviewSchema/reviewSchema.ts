import { z } from "zod";

export const reviewSchema = z.object({
  review: z.string().nonempty({ message: "Write your message" }).optional(),
});
