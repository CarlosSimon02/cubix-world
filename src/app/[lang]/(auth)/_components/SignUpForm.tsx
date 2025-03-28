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
import { useSignUp } from "../_hooks/useSignUp";
import AuthLayout from "./AuthLayout";

const translations = {
  form: {
    title: "Create Your Account",
    nameLabel: "Full Name",
    namePlaceholder: "Enter your name",
    emailLabel: "Email Address",
    emailPlaceholder: "Enter your email",
    passwordLabel: "Create Password",
    passwordPlaceholder: "Create a password",
    submitButton: "Create Account",
    dividerText: "Or continue with",
    googleButton: "Sign in with Google",
    loginPrompt: "Already have an account?",
    loginLink: "Log In",
  },
  validation: {
    nameRequired: "Please enter your name",
    emailRequired: "Please enter your email",
    emailInvalid: "Please enter a valid email address",
    passwordRequired: "Please create a password",
  },
  errors: {
    validationFailed: "Validation failed:",
  },
};

const formSchema = z.object({
  name: z.string().min(1, translations.validation.nameRequired),
  email: z
    .string()
    .min(1, translations.validation.emailRequired)
    .email(translations.validation.emailInvalid),
  password: z.string().min(1, translations.validation.passwordRequired),
});

type FormValues = z.infer<typeof formSchema>;

const SignUpForm = () => {
  const signUpMutation = useSignUp();
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
      await signUpMutation.mutateAsync(data);
    } catch (error) {
      console.log(translations.errors.validationFailed, error);
    }
  };

  const handleGoogleSignIn = async () => {
    await googleSignInMutation.mutateAsync();
  };

  const isLoading = signUpMutation.isPending || googleSignInMutation.isPending;
  const isSuccess = signUpMutation.isSuccess || googleSignInMutation.isSuccess;

  return (
    <AuthLayout title={translations.form.title}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="field">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {translations.form.nameLabel}
          </label>
          <InputText
            id="name"
            {...register("name")}
            placeholder={translations.form.namePlaceholder}
            disabled={isLoading || isSuccess}
            className={classNames("w-full", { "p-invalid": errors.name })}
          />
          {errors.name && (
            <small className="p-error">{errors.name.message}</small>
          )}
        </div>

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
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {translations.form.passwordLabel}
          </label>
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
          loading={signUpMutation.isPending}
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
          disabled={isSuccess || signUpMutation.isPending}
          onClick={handleGoogleSignIn}
        />

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {translations.form.loginPrompt}{" "}
            <Link href="/login" passHref>
              <Button
                type="button"
                label={translations.form.loginLink}
                className="p-button-link p-0"
              />
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUpForm;
