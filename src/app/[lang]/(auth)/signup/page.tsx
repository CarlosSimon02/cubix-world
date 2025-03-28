import { Metadata } from "next";
import SignUpForm from "../_components/SignUpForm";

const translations = {
  metadata: {
    title: "Sign Up",
    description: "Create a new account to get started with Cubix World",
  },
};

export const metadata: Metadata = {
  title: translations.metadata.title,
  description: translations.metadata.description,
};

const SignUpPage = () => {
  return <SignUpForm />;
};

export default SignUpPage;
