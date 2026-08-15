"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTransition } from "react";
import { FieldValues, useForm } from "react-hook-form";

import { Input } from "@/components/form-elements/input";
import { PasswordInput } from "@/components/form-elements/password-input/password-input";
import { LogoIcon } from "@/components/icons/logo-copy";

export function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
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
      console.log("Register Data:", inputs);
    });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-4">
      <div className="flex w-full justify-center p-6">
        <Link href="/">
          <LogoIcon className="h-auto w-24" />
        </Link>
      </div>
      <div className="max-w-[510px] w-full rounded-xl bg-white p-8 shadow-sm">
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
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-3">
          <Input
            size="md"
            label="First Name"
            required
            autoComplete="given-name"
            {...register("firstName", { required: "First name is required" })}
            error={errors.firstName?.message as string}
            placeholder="Enter your first name"
          />
          <Input
            size="md"
            label="Last Name"
            required
            autoComplete="family-name"
            {...register("lastName", { required: "Last name is required" })}
            error={errors.lastName?.message as string}
            placeholder="Enter your last name"
          />
          <Input
            size="md"
            label="Email"
            required
            autoComplete="email"
            className="col-span-full"
            {...register("email", { required: "Email is required" })}
            error={errors.email?.message as string}
            placeholder="Enter your email address"
          />
          <Input
            size="md"
            label="Phone"
            required
            autoComplete="tel"
            className="col-span-full"
            {...register("phone", { required: "Phone number is required" })}
            error={errors.phone?.message as string}
            placeholder="Enter your phone number"
          />
          <PasswordInput
            size="md"
            label="Password"
            required
            autoComplete="new-password"
            className="col-span-full"
            {...register("password", { required: "Password is required" })}
            error={errors.password?.message as string}
            placeholder="Enter your password"
          />
          <div className="col-span-full pt-2">
            <Button
              type="submit"
              variant="brand"
              className="w-full rounded-3xl py-3 font-semibold text-white">
              {isPending ? "Please wait..." : "Register"}
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
