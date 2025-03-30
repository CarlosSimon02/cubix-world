"use client";

import LocaleLink from "@/presentation/components/LocaleLink";
import {
  Anchor,
  Box,
  Button,
  Divider,
  Group,
  Input,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBrandGoogle } from "@tabler/icons-react";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { useGoogleSignIn } from "../_hooks/useGoogleSignIn";
import { useLogin } from "../_hooks/useLogin";
import AuthLayout from "./AuthLayout";

const translations = {
  form: {
    title: "Welcome back!",
    description: "Enter your email and password to log in.",
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

  const form = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(formSchema),
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
          label={translations.form.emailLabel}
          placeholder={translations.form.emailPlaceholder}
          {...form.getInputProps("email")}
          disabled={isLoading || isSuccess}
          withAsterisk
        />

        <PasswordInput
          classNames={{ label: "w-full" }}
          label={
            <Group justify="space-between">
              <Input.Label required className="!w-fit">
                {translations.form.passwordLabel}
              </Input.Label>
              <Anchor
                component={LocaleLink}
                href="/forgot-password"
                variant="subtle"
                size="xs"
                px={0}
              >
                {translations.form.forgotPassword}
              </Anchor>
            </Group>
          }
          placeholder={translations.form.passwordPlaceholder}
          type="password"
          {...form.getInputProps("password")}
          disabled={isLoading || isSuccess}
        />

        <Button
          type="submit"
          fullWidth
          loading={loginMutation.isPending}
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
          disabled={isSuccess || loginMutation.isPending}
          onClick={handleGoogleSignIn}
        >
          {translations.form.googleButton}
        </Button>

        <Text c="dimmed" size="sm" ta="center" mt="md">
          {translations.form.signUpPrompt}{" "}
          <Anchor
            component={LocaleLink}
            href="/signup"
            variant="subtle"
            size="sm"
          >
            {translations.form.signUpLink}
          </Anchor>
        </Text>
      </Box>
    </AuthLayout>
  );
};

export default LoginForm;
