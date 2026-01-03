import z from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current Password Required"),
    newPassword: z.string().min(6, "Minimum 6 Character Required"),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password do not Match!",
    path: ["confirmPassword"],
  });

export type changePasswordType = z.infer<typeof changePasswordSchema>;
