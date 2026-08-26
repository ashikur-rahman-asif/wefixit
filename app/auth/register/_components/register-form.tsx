"use client";

import { Button } from "@/components/ui/button";
import {
  RegisterInput,
  registerSchema,
  VerifyOtpInput,
  verifyOtpSchema,
} from "@/validators/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  useRegister,
  useResendRegistrationOtp,
  useVerifyRegistrationOtp,
} from "@/hooks/useAuth";
import { handleFormError } from "@/lib/handle-form-error";
import { RegisterPayload } from "@/types/auth";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { Input } from "@/components/form-elements/input";
import { OTPInput } from "@/components/form-elements/otp-input";
import { PasswordInput } from "@/components/form-elements/password-input/password-input";
import { LogoIcon } from "@/components/icons/logo-copy";

export function RegisterForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<RegisterInput | null>(null);
  const [timeLeft, setTimeLeft] = useState(120);
  const router = useRouter();

  const { mutate: registerUser, isPending: isRegistering } = useRegister();
  const { mutate: verifyOtp, isPending: isVerifying } =
    useVerifyRegistrationOtp();
  const { mutate: resendOtp, isPending: isResending } =
    useResendRegistrationOtp();

  const registrationForm = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  const otpForm = useForm<VerifyOtpInput>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { otp: "" },
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

  function handleRegister(inputs: RegisterInput) {
    registerUser(inputs as RegisterPayload, {
      onSuccess: () => {
        setFormData(inputs);
        setTimeLeft(120);
        setStep(2);
      },
      onError: (error) =>
        handleFormError(
          error,
          registrationForm.setError,
          "Registration failed. Please try again.",
        ),
    });
  }

  function handleResend() {
    if (timeLeft > 0 || !formData?.email) return;
    resendOtp(formData.email, {
      onSuccess: () => {
        setTimeLeft(120);
        toast.success("OTP sent successfully!");
      },
      onError: (error) =>
        handleFormError(error, undefined, "Failed to resend OTP."),
    });
  }

  function handleVerifyOTP(inputs: VerifyOtpInput) {
    if (!formData?.email) return;
    verifyOtp(
      { email: formData.email, otp: inputs.otp },
      {
        onSuccess: () => {
          toast.success("Email verified successfully!");
          router.push("/auth/login");
        },
        onError: (error) =>
          handleFormError(
            error,
            otpForm.setError,
            "Verification failed. Please try again.",
          ),
      },
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-4">
      <div className="flex w-full justify-center p-6">
        <Link href="/">
          <LogoIcon className="h-auto w-24" />
        </Link>
      </div>

      <div className="max-w-[510px] w-full rounded-xl bg-white p-8 shadow-sm">
        {/* Step 1 — Registration Form */}
        {step === 1 && (
          <>
            <div className="mb-8">
              <h2 className="text-center text-2xl font-bold text-black md:text-3xl">
                Create an account!
              </h2>
              <div className="mt-3 flex justify-center gap-1 text-sm">
                <span>Already have an account?</span>
                <Link
                  href="/auth/login"
                  className="cursor-pointer text-brand hover:underline">
                  Login
                </Link>
              </div>
            </div>
            <form
              noValidate
              onSubmit={registrationForm.handleSubmit(handleRegister)}
              className="grid grid-cols-2 gap-3">
              <Input
                size="md"
                label="First Name"
                required
                autoComplete="given-name"
                {...registrationForm.register("firstName")}
                error={registrationForm.formState.errors.firstName?.message}
                placeholder="Enter your first name"
              />
              <Input
                size="md"
                label="Last Name"
                required
                autoComplete="family-name"
                {...registrationForm.register("lastName")}
                error={registrationForm.formState.errors.lastName?.message}
                placeholder="Enter your last name"
              />
              <Input
                size="md"
                label="Email"
                required
                autoComplete="email"
                className="col-span-full"
                {...registrationForm.register("email")}
                error={registrationForm.formState.errors.email?.message}
                placeholder="Enter your email address"
              />
              <Input
                size="md"
                label="Phone"
                required
                autoComplete="tel"
                className="col-span-full"
                {...registrationForm.register("phone")}
                error={registrationForm.formState.errors.phone?.message}
                placeholder="Enter your phone number"
              />
              <PasswordInput
                size="md"
                label="Password"
                required
                autoComplete="new-password"
                className="col-span-full"
                {...registrationForm.register("password")}
                error={registrationForm.formState.errors.password?.message}
                placeholder="Enter your password"
              />
              <div className="col-span-full pt-2">
                <Button
                  type="submit"
                  variant="brand"
                  disabled={isRegistering}
                  className="w-full rounded-3xl py-3 font-semibold text-white">
                  {isRegistering ? "Sending OTP..." : "Register"}
                </Button>
              </div>
            </form>
          </>
        )}

        {/* Step 2 — OTP Verification */}
        {step === 2 && (
          <>
            <div className="mb-8">
              <h2 className="text-center text-2xl font-bold text-black md:text-3xl">
                Verify OTP
              </h2>
              <p className="mt-3 text-center text-sm text-gray-500">
                We have sent a verification code to{" "}
                <span className="font-semibold">{formData?.email}</span>.
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
                  className={cn("w-full rounded-3xl py-3 font-semibold text-white")}>
                  {isVerifying ? "Verifying..." : "Verify OTP"}
                </Button>
              </div>
              <div className="text-center mt-2 flex justify-center gap-1 text-sm">
                <span className="text-gray-500">
                  Didn&apos;t receive the code?
                </span>
                <button
                  type="button"
                  disabled={timeLeft > 0 || isResending}
                  className={cn(
                    "font-medium",
                    timeLeft > 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-brand hover:underline cursor-pointer"
                  )}
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
      </div>

      <div className="pb-8">
        <p className="text-sm font-medium text-titleBlack/70">
          © {new Date().getFullYear()} Wefixit All rights reserved
        </p>
      </div>
    </div>
  );
}
