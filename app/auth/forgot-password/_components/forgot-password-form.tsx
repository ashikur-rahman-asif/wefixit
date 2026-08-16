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
import { useForgotPasswordStore } from "@/store/forgot-password-store";

function Step1Email() {
  const [isPending, startTransition] = useTransition();
  const { setStep, setEmail } = useForgotPasswordStore();
  const form = useForm({
    defaultValues: {
      email: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  function onSubmit(inputs: FieldValues) {
    startTransition(async () => {
      // TODO: call api to send the email
      console.log("Send OTP to:", inputs.email);

      // save email in store and go to next step
      setEmail(inputs.email);
      setStep(2);
    });
  }

  return (
    <>
      <div className="mb-8">
        <h2 className="text-center text-2xl font-bold text-black md:text-3xl">
          Forgot Password
        </h2>
        <p className="mt-3 text-center text-sm text-gray-500">
          Enter your email address and we&apos;ll send you an OTP to reset your
          password.
        </p>
      </div>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4">
        <Input
          size="md"
          label="Email"
          required
          autoComplete="email"
          {...register("email", { required: "Email is required" })}
          error={errors.email?.message as string}
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
          <Link
            href="/auth/login"
            className="text-sm font-medium text-brand hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
    </>
  );
}

function Step2OTP() {
  const [isPending, startTransition] = useTransition();
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = () => {
    if (timeLeft > 0) return;
    console.log("Resend OTP for email:", email);
    setTimeLeft(120);
    // TODO: Call API to resend OTP
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const { email, setStep, setResetToken } = useForgotPasswordStore();
  const form = useForm({
    defaultValues: {
      otp: "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  function onSubmit(inputs: FieldValues) {
    startTransition(async () => {
      // TODO: Call API to verify OTP
      console.log("Verify OTP:", inputs.otp, "for email:", email);

      // Save reset token and go to next step
      setResetToken("mock-reset-token-123");
      setStep(3);
    });
  }

  return (
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
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4">
        <div className="flex justify-center mb-2">
          <Controller
            name="otp"
            control={control}
            rules={{
              required: "OTP is required",
              minLength: { value: 6, message: "Must be 6 digits" },
            }}
            render={({ field }) => (
              <OTPInput
                maxLength={6}
                value={field.value}
                onChange={field.onChange}
                error={errors.otp?.message as string}
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
            className="text-sm font-medium text-gray-500 hover:underline">
            Change Email
          </button>
        </div>
      </form>
    </>
  );
}

function Step3NewPassword() {
  const [isPending, startTransition] = useTransition();
  const { email, resetToken, clearState } = useForgotPasswordStore();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const password = watch("password");

  function onSubmit(inputs: FieldValues) {
    startTransition(async () => {
      // TODO: Call API to set new password using resetToken
      console.log(
        "Set new password for:",
        email,
        "with token:",
        resetToken,
        "Data:",
        inputs,
      );

      // Clear state and redirect to login
      clearState();
      router.push("/auth/login");
    });
  }

  return (
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
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4">
        <PasswordInput
          size="md"
          label="New Password"
          required
          autoComplete="new-password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={errors.password?.message as string}
          placeholder="Enter new password"
        />

        <PasswordInput
          size="md"
          label="Confirm Password"
          required
          autoComplete="new-password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          error={errors.confirmPassword?.message as string}
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
  );
}

export function ForgotPasswordForm() {
  const step = useForgotPasswordStore((state) => state.step);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-8">
      <div className="flex w-full justify-center p-6">
        <Link href="/">
          <LogoIcon className="h-auto w-24" />
        </Link>
      </div>
      <div className="w-full max-w-[510px] rounded-xl bg-white p-8 shadow-sm">
        {step === 1 && <Step1Email />}
        {step === 2 && <Step2OTP />}
        {step === 3 && <Step3NewPassword />}
      </div>
      <div className="pb-8">
        <p className="text-sm font-medium text-titleBlack/70">
          © {new Date().getFullYear()} Wefixit All rights reserved
        </p>
      </div>
    </div>
  );
}
