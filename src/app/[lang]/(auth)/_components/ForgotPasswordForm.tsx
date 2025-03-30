"use client";

import LocaleLink from "@/presentation/components/LocaleLink";
import {
  Alert,
  Anchor,
  Box,
  Button,
  Center,
  Group,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowLeft, IconCheck } from "@tabler/icons-react";
import { zodResolver } from "mantine-form-zod-resolver";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { useResetPassword } from "../_hooks/useResetPassword";
import AuthLayout from "./AuthLayout";

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
    backToSignIn: "Back to the login page",
  },
  errors: {
    submissionFailed: "Submission failed:",
  },
};

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

  const form = useForm<FormValues>({
    initialValues: {
      email: "",
    },
    validate: zodResolver(formSchema),
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
        <Box className="text-center">
          <Alert
            variant="light"
            color="green"
            title={translations.success.title}
            icon={<IconCheck size="1.5rem" />}
            className="mb-4"
          >
            <Text>
              {translations.success.message} {submittedEmail}
            </Text>
          </Alert>
          <Group justify="center" mt="md">
            <Button
              component={Link}
              href="/login"
              variant="subtle"
              leftSection={<IconArrowLeft size="1rem" />}
            >
              {translations.success.backToSignIn}
            </Button>
          </Group>
        </Box>
      ) : (
        <form onSubmit={form.onSubmit(onSubmit)} className="space-y-6">
          <TextInput
            label={translations.form.emailLabel}
            placeholder={translations.form.emailPlaceholder}
            disabled={isLoading || isSuccess}
            error={form.errors.email}
            withAsterisk
            {...form.getInputProps("email")}
          />

          <Group
            justify="space-between"
            mt="lg"
            className="max-xs:flex-col-reverse"
          >
            <Anchor
              c="dimmed"
              size="sm"
              className="max-xs:w-full max-xs:text-center"
              component={LocaleLink}
              href="/login"
            >
              <Center inline>
                <IconArrowLeft size={12} stroke={1.5} />
                <Box ml={5}>{translations.form.backToSignIn}</Box>
              </Center>
            </Anchor>
            <Button
              type="submit"
              className="max-xs:w-full max-xs:text-center"
              loading={isLoading}
              disabled={isSuccess}
            >
              {translations.form.submitButton}
            </Button>
          </Group>
        </form>
      )}
    </AuthLayout>
  );
};

export default ForgotPasswordForm;
