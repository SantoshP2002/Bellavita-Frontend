import { z } from "zod";

export const uploadProductSchema = z.object({
  title: z
    .string({ error: "Title must be string" })
    .nonempty("Title is required")
    .min(1, { message: "Title must have minimum 2 characters long" }),
  brand: z
    .string({ error: "Brand must be string" })
    .nonempty("Brand is required")
    .min(1, { message: "Brand must have minimum 2 characters long" }),
  price: z
    .number({ error: "Price is required" })
    .nonnegative("Price must be a positive number")
    .min(1, { message: "Minimum price should be 1" }),
});
