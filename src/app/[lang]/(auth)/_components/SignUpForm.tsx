"use client";

import LocaleLink from "@/presentation/components/LocaleLink";
import { Anchor, Box, Button, Divider, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBrandGoogle } from "@tabler/icons-react";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { useGoogleSignIn } from "../_hooks/useGoogleSignIn";
import { useSignUp } from "../_hooks/useSignUp";
import AuthLayout from "./AuthLayout";

const translations = {
  form: {
    title: "Create Your Account",
    description: "Enter your email and password to sign up.",
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

  const form = useForm<FormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await signUpMutation.mutateAsync(values);
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
    <AuthLayout
      title={translations.form.title}
      description={translations.form.description}
    >
      <Box
        component="form"
        onSubmit={form.onSubmit(onSubmit)}
        className="space-y-4"
      >
        <TextInput
          label={translations.form.nameLabel}
          placeholder={translations.form.namePlaceholder}
          {...form.getInputProps("name")}
          disabled={isLoading || isSuccess}
          required
        />

        <TextInput
          label={translations.form.emailLabel}
          placeholder={translations.form.emailPlaceholder}
          {...form.getInputProps("email")}
          disabled={isLoading || isSuccess}
          required
        />

        <TextInput
          label={translations.form.passwordLabel}
          placeholder={translations.form.passwordPlaceholder}
          type="password"
          {...form.getInputProps("password")}
          disabled={isLoading || isSuccess}
          required
        />

        <Button
          type="submit"
          fullWidth
          loading={signUpMutation.isPending}
          disabled={isSuccess || googleSignInMutation.isPending}
        >
          {translations.form.submitButton}
        </Button>

        <Divider
          label={translations.form.dividerText}
          labelPosition="center"
          my="md"
        />

        <Button
          leftSection={<IconBrandGoogle size="1rem" />}
          variant="outline"
          fullWidth
          loading={googleSignInMutation.isPending}
          disabled={isSuccess || signUpMutation.isPending}
          onClick={handleGoogleSignIn}
        >
          {translations.form.googleButton}
        </Button>

        <Text c="dimmed" size="sm" ta="center" mt="md">
          {translations.form.loginPrompt}{" "}
          <Anchor
            component={LocaleLink}
            href="/login"
            variant="subtle"
            size="sm"
            px={0}
          >
            {translations.form.loginLink}
          </Anchor>
        </Text>
      </Box>
    </AuthLayout>
  );
};

export default SignUpForm;
