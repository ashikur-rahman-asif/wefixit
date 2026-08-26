"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import {
  forgotPasswordSchema,
  verifyOtpSchema,
  resetPasswordSchema,
  type ForgotPasswordInput,
  type VerifyOtpInput,
  type ResetPasswordInput,
} from "@/validators/user";

import {
  useForgotPassword,
  useVerifyResetOtp,
  useResetPassword,
} from "@/hooks/useAuth";
import { handleFormError } from "@/lib/handle-form-error";

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
  const { mutate: forgotPassword, isPending: isSending } = useForgotPassword();
  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyResetOtp();
  const { mutate: resetPassword, isPending: isResetting } = useResetPassword();

  const router = useRouter();

  const emailForm = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });
  
  const otpForm = useForm<VerifyOtpInput>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { otp: "" },
  });
  
  const passwordForm = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });



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

  function handleSendOTP(inputs: ForgotPasswordInput) {
    forgotPassword(inputs, {
      onSuccess: (data) => {
        toast.success(data.message || "OTP sent successfully!");
        setEmail(inputs.email);
        setTimeLeft(120);
        setStep(2);
      },
      onError: (error) => {
        handleFormError(error, emailForm.setError, "Failed to send OTP.");
      },
    });
  }

  function handleResend() {
    if (timeLeft > 0) return;
    forgotPassword(
      { email },
      {
        onSuccess: () => {
          toast.success("OTP resent successfully!");
          setTimeLeft(120);
        },
        onError: (error) => {
          handleFormError(error, undefined, "Failed to resend OTP.");
        },
      }
    );
  }

  function handleVerifyOTP(inputs: VerifyOtpInput) {
    verifyOtp(
      { email, otp: inputs.otp },
      {
        onSuccess: (res) => {
          toast.success(res.message || "OTP verified!");
          setResetToken(res.data?.reset_token || "");
          setStep(3);
        },
        onError: (error) => {
          handleFormError(error, otpForm.setError, "Invalid OTP.");
        },
      }
    );
  }

  function handleSetPassword(inputs: ResetPasswordInput) {
    resetPassword(
      {
        reset_token: resetToken,
        password: inputs.password,
        password_confirmation: inputs.confirmPassword,
      },
      {
        onSuccess: (res) => {
          toast.success(res.message || "Password reset successfully!");
          router.push("/auth/login");
        },
        onError: (error) => {
          handleFormError(error, passwordForm.setError, "Failed to reset password.");
        },
      }
    );
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
                {...emailForm.register("email")}
                error={emailForm.formState.errors.email?.message}
                placeholder="Enter your email"
              />
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="brand"
                  disabled={isSending}
                  className={cn("w-full rounded-3xl py-3 font-semibold text-white", isSending && "cursor-not-allowed opacity-70")}>
                  {isSending ? "Sending OTP..." : "Send OTP"}
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
                  render={({ field }) => (
                    <OTPInput
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                      error={otpForm.formState.errors.otp?.message}
                    />
                  )}
                />
              </div>
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="brand"
                  disabled={isVerifying}
                  className={cn("w-full rounded-3xl py-3 font-semibold text-white", isVerifying && "cursor-not-allowed opacity-70")}>
                  {isVerifying ? "Verifying..." : "Verify OTP"}
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
                {...passwordForm.register("password")}
                error={passwordForm.formState.errors.password?.message}
                placeholder="Enter new password"
              />
              <PasswordInput
                size="md"
                label="Confirm Password"
                required
                autoComplete="new-password"
                {...passwordForm.register("confirmPassword")}
                error={passwordForm.formState.errors.confirmPassword?.message}
                placeholder="Confirm new password"
              />
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="brand"
                  disabled={isResetting}
                  className={cn("w-full rounded-3xl py-3 font-semibold text-white", isResetting && "cursor-not-allowed opacity-70")}>
                  {isResetting ? "Updating..." : "Update Password"}
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
