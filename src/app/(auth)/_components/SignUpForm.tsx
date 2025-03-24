"use client";

import { GoogleOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Grid, Input, Typography, theme } from "antd";
import Link from "next/link";
import { useGoogleSignIn } from "../_hooks/useGoogleSignIn";
import { useSignUp } from "../_hooks/useSignUp";
import AuthLayout from "./AuthLayout";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text } = Typography;

const SignUpForm = () => {
  const { token } = useToken();
  const screens = useBreakpoint();
  const [form] = Form.useForm();

  const signUpMutation = useSignUp();
  const googleSignInMutation = useGoogleSignIn();

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      await signUpMutation.mutateAsync(values);
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    await googleSignInMutation.mutateAsync();
  };

  const isLoading = signUpMutation.isPending || googleSignInMutation.isPending;
  const isSuccess = signUpMutation.isSuccess || googleSignInMutation.isSuccess;

  const styles = {
    submitButton: {
      width: "100%",
    },
    dividerText: {
      color: token.colorTextSecondary,
    },
    linkContainer: {
      textAlign: "center" as const,
      marginTop: token.margin,
    },
  };

  return (
    <AuthLayout title="Create Your Account">
      <Form form={form} onFinish={onSubmit} layout="vertical">
        <Form.Item
          name="name"
          label="Full Name"
          rules={[
            {
              required: true,
              message: "Please enter your name",
            },
          ]}
        >
          <Input
            placeholder="Enter your name"
            disabled={isLoading || isSuccess}
            size="large"
          />
        </Form.Item>

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

        <Form.Item
          name="password"
          label="Create Password"
          rules={[
            {
              required: true,
              message: "Please create a password",
            },
          ]}
        >
          <Input.Password
            placeholder="Create a password"
            disabled={isLoading || isSuccess}
            size="large"
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          style={styles.submitButton}
          loading={signUpMutation.isPending}
          disabled={isSuccess || googleSignInMutation.isPending}
          size="large"
        >
          Create Account
        </Button>

        <Divider>
          <Text style={styles.dividerText}>Or continue with</Text>
        </Divider>

        <Button
          loading={googleSignInMutation.isPending}
          disabled={isSuccess || signUpMutation.isPending}
          size="large"
          style={styles.submitButton}
          icon={<GoogleOutlined />}
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </Button>

        <div style={styles.linkContainer}>
          <Text style={{ color: token.colorTextSecondary }}>
            Already have an account?{" "}
            <Link href="/login" passHref>
              <Button type="link" size="small">
                Log In
              </Button>
            </Link>
          </Text>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default SignUpForm;
