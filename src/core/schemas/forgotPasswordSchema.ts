import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
