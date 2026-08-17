"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";

import { Input } from "@/components/form-elements/input";
import { OTPInput } from "@/components/form-elements/otp-input";
import { PasswordInput } from "@/components/form-elements/password-input/password-input";
import { LogoIcon } from "@/components/icons/logo-copy";
import { Button } from "@/components/ui/button";

export function ForgotPasswordForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const emailForm = useForm({ defaultValues: { email: "" } });
  const otpForm = useForm({ defaultValues: { otp: "" } });
  const passwordForm = useForm({
    defaultValues: { password: "", confirmPassword: "" },
  });

  const password = passwordForm.watch("password");

  // OTP countdown timer
  useEffect(() => {
    if (step !== 2 || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  function handleSendOTP(inputs: FieldValues) {
    startTransition(async () => {
      console.log("Send OTP to:", inputs.email);
      setEmail(inputs.email);
      setTimeLeft(120);
      setStep(2);
    });
  }

  function handleResend() {
    if (timeLeft > 0) return;
    console.log("Resend OTP for email:", email);
    setTimeLeft(120);
  }

  function handleVerifyOTP(inputs: FieldValues) {
    startTransition(async () => {
      console.log("Verify OTP:", inputs.otp, "for email:", email);
      setResetToken("mock-reset-token-123");
      setStep(3);
    });
  }

  function handleSetPassword(inputs: FieldValues) {
    startTransition(async () => {
      console.log("Set new password for:", email, "with token:", resetToken, "Data:", inputs);
      router.push("/auth/login");
    });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-8">
      <div className="flex w-full justify-center p-6">
        <Link href="/">
          <LogoIcon className="h-auto w-24" />
        </Link>
      </div>

      <div className="w-full max-w-[510px] rounded-xl bg-white p-8 shadow-sm">

        {/* Step 1 — Email */}
        {step === 1 && (
          <>
            <div className="mb-8">
              <h2 className="text-center text-2xl font-bold text-black md:text-3xl">
                Forgot Password
              </h2>
              <p className="mt-3 text-center text-sm text-gray-500">
                Enter your email address and we&apos;ll send you an OTP to reset your password.
              </p>
            </div>
            <form
              noValidate
              onSubmit={emailForm.handleSubmit(handleSendOTP)}
              className="flex flex-col gap-4">
              <Input
                size="md"
                label="Email"
                required
                autoComplete="email"
                {...emailForm.register("email", { required: "Email is required" })}
                error={emailForm.formState.errors.email?.message as string}
                placeholder="Enter your email"
              />
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="brand"
                  className="w-full rounded-3xl py-3 font-semibold text-white">
                  {isPending ? "Sending OTP..." : "Send OTP"}
                </Button>
              </div>
              <div className="text-center mt-2">
                <Link href="/auth/login" className="text-sm font-medium text-brand hover:underline">
                  Back to Login
                </Link>
              </div>
            </form>
          </>
        )}

        {/* Step 2 — OTP */}
        {step === 2 && (
          <>
            <div className="mb-8">
              <h2 className="text-center text-2xl font-bold text-black md:text-3xl">
                Verify OTP
              </h2>
              <p className="mt-3 text-center text-sm text-gray-500">
                We have sent a verification code to{" "}
                <span className="font-semibold">{email}</span>.
              </p>
            </div>
            <form
              noValidate
              onSubmit={otpForm.handleSubmit(handleVerifyOTP)}
              className="flex flex-col gap-4">
              <div className="flex justify-center mb-2">
                <Controller
                  name="otp"
                  control={otpForm.control}
                  rules={{
                    required: "OTP is required",
                    minLength: { value: 6, message: "Must be 6 digits" },
                  }}
                  render={({ field }) => (
                    <OTPInput
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                      error={otpForm.formState.errors.otp?.message as string}
                    />
                  )}
                />
              </div>
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="brand"
                  className="w-full rounded-3xl py-3 font-semibold text-white">
                  {isPending ? "Verifying..." : "Verify OTP"}
                </Button>
              </div>
              <div className="text-center mt-2 flex justify-center gap-1 text-sm">
                <span className="text-gray-500">Didn&apos;t receive the code?</span>
                <button
                  type="button"
                  disabled={timeLeft > 0}
                  className={`font-medium ${timeLeft > 0 ? "text-gray-400 cursor-not-allowed" : "text-brand hover:underline"}`}
                  onClick={handleResend}>
                  Resend {timeLeft > 0 && `(${formatTime(timeLeft)})`}
                </button>
              </div>
              <div className="text-center mt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm font-medium text-gray-500 hover:underline cursor-pointer">
                  Change Email
                </button>
              </div>
            </form>
          </>
        )}

        {/* Step 3 — New Password */}
        {step === 3 && (
          <>
            <div className="mb-8">
              <h2 className="text-center text-2xl font-bold text-black md:text-3xl">
                Set New Password
              </h2>
              <p className="mt-3 text-center text-sm text-gray-500">
                Please enter your new password below.
              </p>
            </div>
            <form
              noValidate
              onSubmit={passwordForm.handleSubmit(handleSetPassword)}
              className="flex flex-col gap-4">
              <PasswordInput
                size="md"
                label="New Password"
                required
                autoComplete="new-password"
                {...passwordForm.register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
                error={passwordForm.formState.errors.password?.message as string}
                placeholder="Enter new password"
              />
              <PasswordInput
                size="md"
                label="Confirm Password"
                required
                autoComplete="new-password"
                {...passwordForm.register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === password || "Passwords do not match",
                })}
                error={passwordForm.formState.errors.confirmPassword?.message as string}
                placeholder="Confirm new password"
              />
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="brand"
                  className="w-full rounded-3xl py-3 font-semibold text-white">
                  {isPending ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </form>
          </>
        )}

      </div>

      <div className="pb-8">
        <p className="text-sm font-medium text-titleBlack/70">
          © {new Date().getFullYear()} Wefixit All rights reserved
        </p>
      </div>
    </div>
  );
}
