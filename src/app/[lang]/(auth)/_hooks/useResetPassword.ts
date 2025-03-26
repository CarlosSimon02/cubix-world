"use client";

import { resetPasswordFactory } from "@/factories/auth/resetPasswordFactory";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";

export const useResetPassword = () => {
  const resetPassword = resetPasswordFactory();

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
      notification.info({
        message: "Password reset email sent successfully!",
      });
    },
    onError: (error: Error) => {
      notification.error({
        message: "Failed to send reset email",
      });
      console.error("Password reset error:", error);
    },
  });

  return resetPasswordMutation;
};
