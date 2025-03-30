"use client";

import { resetPasswordFactory } from "@/factories/auth/resetPasswordFactory";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";

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
      notifications.show({
        title: "Password reset email sent successfully!",
        message: "Check your email for a reset link.",
        color: "green",
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Password reset failed",
        message: "Something went wrong. Unable to reset password.",
        color: "red",
      });
      console.error("Password reset error:", error);
    },
  });

  return resetPasswordMutation;
};
