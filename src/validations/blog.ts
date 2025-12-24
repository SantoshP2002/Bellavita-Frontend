import z from "zod";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_FILE_SIZE, MB } from "../constants";

export const blogSchema = z.object({
  image: z
    .union([z.instanceof(File), z.string()])
    .refine((file) => file instanceof File || typeof file === "string", {
      message: "Image is required",
    })
    .superRefine((file, ctx) => {
      // ✅ File validation
      if (typeof File !== "undefined" && file instanceof File) {
        // Size check
        if (file.size > MAX_IMAGE_FILE_SIZE) {
          const sizeInMB = (file.size / MB).toFixed(1);
          ctx.addIssue({
            code: "custom",
            message: `Image is too large (${sizeInMB} MB). Max allowed is 2 MB.`,
          });
        }

        // Type check
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
          ctx.addIssue({
            code: "custom",
            message: `Invalid image format. Allowed: ${ALLOWED_IMAGE_TYPES.map(
              (t) => t.replace("image/", "")
            ).join(", ")}`,
          });
        }
      }

      // ✅ URL validation (edit mode / backend image)
      else if (typeof file === "string") {
        try {
          const url = new URL(file);
          if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error();
          }
        } catch {
          ctx.addIssue({
            code: "custom",
            message: "Image is not a valid URL",
          });
        }
      }
    }),

  // Image end
  title: z
    .string({ error: "Title must be string" })
    .nonempty("Title is required")
    .min(1, { message: "Title must have minimum 2 characters long" }),
  description: z
    .string({ error: "Description must be string" })
    .nonempty("Description is required")
    .min(1, { message: "Description must have minimum 2 characters long" }),
  blog: z.string({ error: "Blog must be string" }).nonempty("Blog is required"),
  date: z
    .string()
    .nonempty("Date is required")
    .refine((value) => !isNaN(new Date(value).getTime()), "Invalid date format")
    .refine(
      (value) => new Date(value) <= new Date(),
      "Future date is not allowed"
    ),
});
