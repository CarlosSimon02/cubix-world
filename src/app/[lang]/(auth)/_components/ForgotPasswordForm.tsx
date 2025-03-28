"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useResetPassword } from "../_hooks/useResetPassword";
import AuthLayout from "./AuthLayout";

// Translation strings
const translations = {
  form: {
    title: "Reset Password",
    description:
      "Enter your email address and we'll send you a link to reset your password.",
    emailLabel: "Email Address",
    emailPlaceholder: "Enter your email",
    submitButton: "Reset Password",
    rememberPassword: "Remember your password?",
    backToSignIn: "Back to sign in",
  },
  validation: {
    emailRequired: "Please enter your email",
    emailInvalid: "Please enter a valid email address",
  },
  success: {
    title: "Check your email",
    message: "We've sent a password reset link to",
    backToSignIn: "Back to sign in",
  },
  errors: {
    submissionFailed: "Submission failed:",
  },
};

// Define Zod schema for form validation
const formSchema = z.object({
  email: z
    .string()
    .min(1, translations.validation.emailRequired)
    .email(translations.validation.emailInvalid),
});

type FormValues = z.infer<typeof formSchema>;

const ForgotPasswordForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const resetPasswordMutation = useResetPassword();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await resetPasswordMutation.mutateAsync(data.email, {
        onSuccess: () => {
          setSubmittedEmail(data.email);
          setIsSubmitted(true);
        },
      });
    } catch (error) {
      console.log(translations.errors.submissionFailed, error);
    }
  };

  const isLoading = resetPasswordMutation.isPending;
  const isSuccess = resetPasswordMutation.isSuccess;

  return (
    <AuthLayout
      title={translations.form.title}
      description={translations.form.description}
    >
      {isSubmitted ? (
        <div className="mt-6 text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-green-100 p-3 text-green-500">
            <i className="pi pi-check" style={{ fontSize: "1.5rem" }}></i>
          </div>
          <h2 className="mb-2 text-2xl font-bold">
            {translations.success.title}
          </h2>
          <p className="text-gray-600">
            {translations.success.message} {submittedEmail}
          </p>
          <div className="mt-6">
            <Link
              href="/login"
              className="text-primary-600 hover:text-primary-800 hover:underline"
            >
              {translations.success.backToSignIn}
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
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

          <Button
            type="submit"
            label={translations.form.submitButton}
            className="w-full"
            loading={isLoading}
            disabled={isSuccess}
          />

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              {translations.form.rememberPassword}{" "}
              <Link href="/login" passHref>
                <Button
                  type="button"
                  label={translations.form.backToSignIn}
                  className="p-button-link p-0"
                />
              </Link>
            </p>
          </div>
        </form>
      )}
    </AuthLayout>
  );
};

export default ForgotPasswordForm;
