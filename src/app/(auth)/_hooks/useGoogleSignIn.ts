"use client";

import { signInWithGoogleFactory } from "@/factories/auth/signInWithGoogleFactory";
import { useRedirectParam } from "@/presentation/hooks/useRedirectParam";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { useRouter } from "next/navigation";
import postSignInAction from "../_actions/postSignInAction";

export const useGoogleSignIn = () => {
  const signInWithGoogle = signInWithGoogleFactory();
  const redirect = useRedirectParam();
  const router = useRouter();

  const googleSignInMutation = useMutation({
    mutationFn: async () => {
      try {
        const authEntity = await signInWithGoogle.execute();
        const response = await postSignInAction(authEntity.idToken);
        if (!response.success) throw new Error(response.error);
        return authEntity;
      } catch (error) {
        console.error("Google sign-in error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      router.push(redirect ?? "/");
    },
    onError: (error: Error) => {
      notification.error({
        message: "Google sign-in failed",
      });
      console.error("Google sign-in error:", error);
    },
  });

  return googleSignInMutation;
};
