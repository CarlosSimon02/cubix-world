"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useGoogleSignIn } from "../_hooks/useGoogleSignIn";
import { useLogin } from "../_hooks/useLogin";
import AuthLayout from "./AuthLayout";

const translations = {
  form: {
    title: "Log In",
    emailLabel: "Email Address",
    emailPlaceholder: "Enter your email",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    forgotPassword: "Forgot Password?",
    submitButton: "Sign In",
    dividerText: "Or continue with",
    googleButton: "Sign in with Google",
    signUpPrompt: "Need to create an account?",
    signUpLink: "Sign up",
  },
  validation: {
    emailRequired: "Please enter your email",
    emailInvalid: "Please enter a valid email address",
    passwordRequired: "Please enter your password",
  },
  errors: {
    validationFailed: "Validation failed:",
  },
};

// Define Zod schema for form validation
const formSchema = z.object({
  email: z
    .string()
    .min(1, translations.validation.emailRequired)
    .email(translations.validation.emailInvalid),
  password: z.string().min(1, translations.validation.passwordRequired),
});

type FormValues = z.infer<typeof formSchema>;

const LoginForm = () => {
  const loginMutation = useLogin();
  const googleSignInMutation = useGoogleSignIn();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await loginMutation.mutateAsync(data);
    } catch (error) {
      console.log(translations.errors.validationFailed, error);
    }
  };

  const handleGoogleSignIn = async () => {
    await googleSignInMutation.mutateAsync();
  };

  const isLoading = loginMutation.isPending || googleSignInMutation.isPending;
  const isSuccess = loginMutation.isSuccess || googleSignInMutation.isSuccess;

  return (
    <AuthLayout title={translations.form.title}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="field">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {translations.form.emailLabel}
          </label>
          <InputText
            id="email"
            {...register("email")}
            placeholder={translations.form.emailPlaceholder}
            disabled={isLoading || isSuccess}
            className={classNames("w-full", { "p-invalid": errors.email })}
          />
          {errors.email && (
            <small className="p-error">{errors.email.message}</small>
          )}
        </div>

        <div className="field">
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              {translations.form.passwordLabel}
            </label>
            <Link href="/forgot-password" passHref>
              <Button
                type="button"
                label={translations.form.forgotPassword}
                className="p-button-link p-0 text-sm"
              />
            </Link>
          </div>
          <InputText
            id="password"
            {...register("password")}
            type="password"
            placeholder={translations.form.passwordPlaceholder}
            disabled={isLoading || isSuccess}
            className={classNames("w-full", { "p-invalid": errors.password })}
          />
          {errors.password && (
            <small className="p-error">{errors.password.message}</small>
          )}
        </div>

        <Button
          type="submit"
          label={translations.form.submitButton}
          className="w-full"
          loading={loginMutation.isPending}
          disabled={isSuccess || googleSignInMutation.isPending}
        />

        <Divider align="center">
          <span className="text-sm text-gray-500">
            {translations.form.dividerText}
          </span>
        </Divider>

        <Button
          label={translations.form.googleButton}
          icon="pi pi-google"
          className="w-full"
          loading={googleSignInMutation.isPending}
          disabled={isSuccess || loginMutation.isPending}
          onClick={handleGoogleSignIn}
        />

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {translations.form.signUpPrompt}{" "}
            <Link href="/signup" passHref>
              <Button
                type="button"
                label={translations.form.signUpLink}
                className="p-button-link p-0"
              />
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginForm;
