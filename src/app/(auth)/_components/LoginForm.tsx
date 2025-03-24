"use client";

import { GoogleOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Typography, theme } from "antd";
import Link from "next/link";
import { useGoogleSignIn } from "../_hooks/useGoogleSignIn";
import { useLogin } from "../_hooks/useLogin";
import AuthLayout from "./AuthLayout";

const { useToken } = theme;
const { Text } = Typography;

const LoginForm = () => {
  const { token } = useToken();
  const [form] = Form.useForm();

  const loginMutation = useLogin();
  const googleSignInMutation = useGoogleSignIn();

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      await loginMutation.mutateAsync(values);
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    await googleSignInMutation.mutateAsync();
  };

  const isLoading = loginMutation.isPending || googleSignInMutation.isPending;
  const isSuccess = loginMutation.isSuccess || googleSignInMutation.isSuccess;

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
    spaceBetween: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "10000px",
    },
  };

  return (
    <AuthLayout title="Log In">
      <Form form={form} onFinish={onSubmit} layout="vertical">
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
          label={
            <div style={styles.spaceBetween}>
              <span>Password</span>
              <Link href="/forgot-password" passHref>
                <Button type="link" size="small">
                  Forgot Password?
                </Button>
              </Link>
            </div>
          }
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
          ]}
        >
          <Input.Password
            placeholder="Enter your password"
            disabled={isLoading || isSuccess}
            size="large"
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          style={styles.submitButton}
          loading={loginMutation.isPending}
          disabled={isSuccess || googleSignInMutation.isPending}
          size="large"
        >
          Sign In
        </Button>

        <Divider>
          <Text style={styles.dividerText}>Or continue with</Text>
        </Divider>

        <Button
          loading={googleSignInMutation.isPending}
          disabled={isSuccess || loginMutation.isPending}
          size="large"
          style={styles.submitButton}
          icon={<GoogleOutlined />}
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </Button>

        <div style={styles.linkContainer}>
          <Text style={{ color: token.colorTextSecondary }}>
            Need to create an account?{" "}
            <Link href="/signup" passHref>
              <Button type="link" size="small">
                Sign up
              </Button>
            </Link>
          </Text>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default LoginForm;
