import { z } from "zod";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_FILE_SIZE } from "../constants";

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
  sellingPrice: z
    .number({ error: "Selling price is required" })
    .nonnegative("Selling price must be a positive number")
    .min(1, { message: "Minimum Selling price should be 1" }),
  description: z
    .string({ error: "Description must be string" })
    .nonempty("Description is required")
    .min(1, { message: "Description must have minimum 2 characters long" }),
  category: z
    .string({ error: "Category must be string" })
    .nonempty("Category is required"),
  productImages: z
    .array(
      z
        .custom<File>((file) => file instanceof File, {
          message: "Invalid file",
        })
        .refine((file) => file.size <= MAX_IMAGE_FILE_SIZE, {
          message: "Image not allowed more than 2MB",
        })
        .refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type), {
          message: "Invalid file type",
        })
    )
    .min(1, "At least one image is required"),
});
