"use client";

import { AuthCredentials } from "@/data/models/authModel";
import { loginWithEmailFactory } from "@/factories/auth/loginWithEmailFactory";
import { useToast } from "@/presentation/contexts/ToastContext";
import { useRedirectParam } from "@/presentation/hooks/useRedirectParam";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import postSignInAction from "../_actions/postSignInAction";

export const useLogin = () => {
  const logInWithEmail = loginWithEmailFactory();
  const redirect = useRedirectParam();
  const router = useRouter();
  const { showError } = useToast();

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
      showError("Login failed");
      console.error("Login error:", error);
    },
  });

  return loginMutation;
};
