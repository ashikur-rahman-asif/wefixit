import { RegisterForm } from "./_components/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | WeFixIt",
  description: "Create a WeFixIt account to book repairs and buy products.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
