import { Metadata } from "next";
import LoginForm from "../_components/LoginForm";

const translations = {
  metadata: {
    title: "Login",
    description: "Sign in to your Cubix World account",
  },
};

export const metadata: Metadata = {
  title: translations.metadata.title,
  description: translations.metadata.description,
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
