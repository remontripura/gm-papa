import { z } from "zod";

export const playerAddressSchema = z.object({
  number: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only digits"),

  transaction_id: z
    .string()
    .min(5, "Transaction number must be at least 5 characters")
    .max(20, "Transaction number cannot exceed 20 characters"),

  method_id: z.string().min(1, "Please select a payment method"),

  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name should only contain letters and spaces"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only digits"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .max(100, "Email cannot exceed 100 characters"),
});