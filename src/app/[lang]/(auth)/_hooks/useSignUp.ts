"use client";

import { AuthCredentials } from "@/data/models/authModel";
import { signUpWithEmailUseCase } from "@/factories/authClient";
import useRedirectParam from "@/presentation/hooks/useRedirectParam";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import postSignInAction from "../_actions/postSignInAction";

type SignUpData = AuthCredentials & {
  name: string;
};

export const useSignUp = () => {
  const redirect = useRedirectParam();
  const router = useRouter();

  const signUpMutation = useMutation({
    mutationFn: async (data: SignUpData) => {
      try {
        const { email, password, name } = data;
        const authEntity = await signUpWithEmailUseCase.execute({
          email,
          password,
        });
        const response = await postSignInAction(authEntity.idToken, { name });
        if (!response.success) throw new Error(response.error);
        return authEntity;
      } catch (error) {
        console.error("Sign up error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      router.push(redirect ?? "/");
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Failed to create account",
        message: "Something went wrong. Unable to create account.",
        color: "red",
      });
      console.error("Sign up error:", error);
    },
  });

  return signUpMutation;
};
