"use client";

import { Button, Form, Grid, Input, Typography, theme } from "antd";
import Link from "next/link";
import { useState } from "react";
import { useResetPassword } from "../_hooks/useResetPassword";
import AuthLayout from "./AuthLayout";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Paragraph, Title } = Typography;

const ForgotPasswordForm = () => {
  const { token } = useToken();
  const screens = useBreakpoint();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [form] = Form.useForm();

  const resetPasswordMutation = useResetPassword();

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      await resetPasswordMutation.mutateAsync(values.email, {
        onSuccess: () => {
          setSubmittedEmail(values.email);
          setIsSubmitted(true);
        },
      });
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const isLoading = resetPasswordMutation.isPending;
  const isSuccess = resetPasswordMutation.isSuccess;

  const styles = {
    successContainer: {
      textAlign: "center" as const,
      marginTop: token.marginLG,
    },
    successIcon: {
      display: "inline-block",
      borderRadius: "50%",
      backgroundColor: token.green1,
      color: token.green6,
      padding: token.paddingSM,
      marginBottom: token.margin,
    },
    link: {
      color: token.colorPrimary,
      textDecoration: "none",
      ":hover": {
        textDecoration: "underline",
      },
    },
    form: {
      marginTop: token.marginLG,
      gap: token.marginXL,
    },
    submitButton: {
      width: "100%",
    },
    textCenter: {
      textAlign: "center" as const,
    },
  };

  return (
    <AuthLayout
      title="Reset Password"
      description="Enter your email address and we'll send you a link to reset your password."
    >
      {isSubmitted ? (
        <div style={styles.successContainer}>
          <div style={styles.successIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <Title level={4} style={{ marginBottom: token.marginXS }}>
            Check your email
          </Title>
          <Paragraph style={{ color: token.colorTextSecondary }}>
            We've sent a password reset link to {submittedEmail}
          </Paragraph>
          <div style={{ marginTop: token.marginLG }}>
            <Link href="/login" style={styles.link}>
              Back to sign in
            </Link>
          </div>
        </div>
      ) : (
        <Form
          form={form}
          onFinish={onSubmit}
          style={styles.form}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
              {
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              disabled={isLoading || isSuccess}
              size="large"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            style={styles.submitButton}
            loading={isLoading}
            disabled={isSuccess}
            size="large"
          >
            Reset Password
          </Button>

          <div style={{ ...styles.textCenter, marginTop: token.margin }}>
            <Paragraph style={{ color: token.colorTextSecondary }}>
              Remember your password?{" "}
              <Link href="/login" passHref>
                <Button type="link" size="small">
                  Back to sign in
                </Button>
              </Link>
            </Paragraph>
          </div>
        </Form>
      )}
    </AuthLayout>
  );
};

export default ForgotPasswordForm;
