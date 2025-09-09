import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Enter valid email" }),
    password: z.string().min(6, "Password minimum 6 chrecter").max(15, "Password most 15 chrecter"),
});


export const registerSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^\d+$/, "Phone must be numeric"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });


  export const searchSchema = z.object({
    search: z.string().nonempty(),
});
