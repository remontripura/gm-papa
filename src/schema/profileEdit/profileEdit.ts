import { z } from "zod";

export const profileEditSchema = z.object({
  name: z.string().nonempty({ message: "Please enter your name" }),
  phone: z
    .string()
    .nonempty({ message: "Please enter your mobile number" })
    .regex(/^\d{10,15}$/, {
      message: "Mobile number must be between 10 to 15 digits",
    }),
});
