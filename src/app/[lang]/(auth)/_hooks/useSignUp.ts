"use client";

import { AuthCredentials } from "@/data/models/authModel";
import { signUpWithEmailFactory } from "@/factories/auth/signUpWithEmailFactory";
import { useToast } from "@/presentation/contexts/ToastContext";
import { useRedirectParam } from "@/presentation/hooks/useRedirectParam";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import postSignInAction from "../_actions/postSignInAction";

type SignUpData = AuthCredentials & {
  name: string;
};

export const useSignUp = () => {
  const signUpWithEmail = signUpWithEmailFactory();
  const redirect = useRedirectParam();
  const router = useRouter();
  const { showError } = useToast();

  const signUpMutation = useMutation({
    mutationFn: async (data: SignUpData) => {
      try {
        const { email, password, name } = data;
        const authEntity = await signUpWithEmail.execute({
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
      showError("Failed to create account");
      console.error("Sign up error:", error);
    },
  });

  return signUpMutation;
};
