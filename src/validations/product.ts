import { z } from "zod";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_FILE_SIZE, MB } from "../constants";

export const productSchema = z
  .object({
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
      .array(z.any())
      .min(1, "At least one image is required")
      .superRefine((files, ctx) => {
        files.forEach((file, index) => {
          if (typeof File !== "undefined" && file instanceof File) {
            // File size check
            if (file.size > MAX_IMAGE_FILE_SIZE) {
              const sizeInMB = (file.size / MB).toFixed(1);
              ctx.addIssue({
                code: "custom",
                message: `Image ${
                  index + 1
                } is too large (${sizeInMB} MB). Max allowed is 2 MB.`,
                path: [index],
              });
            }

            // File type check
            if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
              ctx.addIssue({
                code: "custom",
                message: `Image ${
                  index + 1
                } invalid format. Allowed formats: ${ALLOWED_IMAGE_TYPES.map(
                  (t) => t.replace("image/", "")
                ).join(", ")}`,
                path: [index],
              });
            }
          } else if (typeof file === "string") {
            try {
              const url = new URL(file);
              if (!["http:", "https:"].includes(url.protocol)) {
                throw new Error();
              }
            } catch {
              ctx.addIssue({
                code: "custom",
                message: `Image ${index + 1} is not a valid URL`,
                path: [index],
              });
            }
          } else {
            ctx.addIssue({
              code: "custom",
              message: `Item ${index + 1} must be a File or a valid image URL`,
              path: [index],
            });
          }
        });
      }),
  })
  .refine((data) => data.sellingPrice <= data.price, {
    message: "Selling price cannot be greater than Price",
    path: ["sellingPrice"],
  });
