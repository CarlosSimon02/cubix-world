"use client";

import { resetPasswordFactory } from "@/factories/auth/resetPasswordFactory";
import { useToast } from "@/presentation/contexts/ToastContext";
import { useMutation } from "@tanstack/react-query";

export const useResetPassword = () => {
  const resetPassword = resetPasswordFactory();
  const { showError } = useToast();

  const resetPasswordMutation = useMutation({
    mutationFn: async (email: string) => {
      try {
        await resetPassword.execute(email);
      } catch (error) {
        console.error("Password reset error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      showError("Password reset email sent successfully!");
    },
    onError: (error: Error) => {
      showError("Failed to send reset email");
      console.error("Password reset error:", error);
    },
  });

  return resetPasswordMutation;
};
