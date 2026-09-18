import { ForgotPasswordForm } from "./_components/forgot-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | WeFixIt",
  description: "Reset your WeFixIt account password.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
