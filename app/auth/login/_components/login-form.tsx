"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTransition } from "react";
import { FieldValues, useForm } from "react-hook-form";

import { Input } from "@/components/form-elements/input";
import { PasswordInput } from "@/components/form-elements/password-input/password-input";
import { LogoIcon } from "@/components/icons/logo-copy";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  function onSubmit(inputs: FieldValues) {
    startTransition(async () => {
      console.log("Login Data:", inputs);
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
        <div className="mb-8">
          <h2 className="text-center text-2xl font-bold text-black md:text-3xl">
            Welcome Back
          </h2>
          <div className="mt-3 flex justify-center gap-1 text-sm">
            <span>New User?</span>
            <Link
              href="/auth/register"
              className="cursor-pointer text-brand hover:underline">
              Create an account
            </Link>
          </div>
        </div>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-3">
          <Input
            size="md"
            label="Email"
            required
            autoComplete="email"
            {...register("email", { required: "Email is required" })}
            error={errors.email?.message as string}
            className="col-span-full"
            placeholder="Enter your email"
          />
          <PasswordInput
            size="md"
            label="Password"
            required
            autoComplete="current-password"
            {...register("password", { required: "Password is required" })}
            error={errors.password?.message as string}
            className="col-span-full"
            placeholder="Enter your password"
          />
          <div className="col-span-full flex justify-end">
            <Link
              href="/auth/forgot-password"
              className="text-sm font-medium text-red-500 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <div className="col-span-full pt-2">
            <Button
              type="submit"
              variant="brand"
              className="w-full rounded-3xl py-3 font-semibold text-white">
              {isPending ? "Please wait..." : "Log In"}
            </Button>
          </div>
        </form>
      </div>
      <div className="pb-8">
        <p className="text-sm font-medium text-titleBlack/70">
          © {new Date().getFullYear()} Wefixit All rights reserved
        </p>
      </div>
    </div>
  );
}
