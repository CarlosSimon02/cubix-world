"use client";

import { AuthCredentials } from "@/data/models/authModel";
import { loginWithEmailFactory } from "@/factories/auth/loginWithEmailFactory";
import useRedirectParam from "@/presentation/hooks/useRedirectParam";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import postSignInAction from "../_actions/postSignInAction";

export const useLogin = () => {
  const logInWithEmail = loginWithEmailFactory();
  const redirect = useRedirectParam();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (credentials: AuthCredentials) => {
      try {
        const authEntity = await logInWithEmail.execute(credentials);
        const response = await postSignInAction(authEntity.idToken);
        if (!response.success) throw new Error(response.error);
        return authEntity;
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      router.push(redirect ?? "/");
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Login failed",
        message: "Something went wrong. Unable to login.",
        color: "red",
      });
      console.error("Login error:", error);
    },
  });

  return loginMutation;
};
