import { LoginForm } from "./_components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | WeFixIt",
  description: "Log in to your WeFixIt account to track your orders and repairs.",
};

export default function LoginPage() {
  return <LoginForm />;
}
