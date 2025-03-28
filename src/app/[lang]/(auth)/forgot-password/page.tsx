import { Metadata } from "next";
import ForgotPasswordForm from "../_components/ForgotPasswordForm";

const translations = {
  metadata: {
    title: "Forgot Password",
    description: "Reset your Cubix World password",
  },
};

export const metadata: Metadata = {
  title: translations.metadata.title,
  description: translations.metadata.description,
};

const ForgotPasswordPage = () => {
  return <ForgotPasswordForm />;
};

export default ForgotPasswordPage;
