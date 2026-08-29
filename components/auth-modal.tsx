import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/validators/user";
import { useLogin } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { Input } from "@/components/form-elements/input";
import { PasswordInput } from "@/components/form-elements/password-input/password-input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { handleFormError } from "@/lib/handle-form-error";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title?: string;
  description?: string;
  registerCallbackUrl?: string;
}

export function AuthModal({ 
  isOpen, 
  onClose, 
  onSuccess,
  title = "Welcome Back",
  description = "Please log in to your account to continue.",
  registerCallbackUrl
}: AuthModalProps) {
  const { mutate: login, isPending } = useLogin();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(inputs: LoginInput) {
    login(inputs, {
      onSuccess: (res) => {
        if (res.data?.user && res.data?.token) {
          setAuth(res.data.user, res.data.token);
          toast.success("Login successful!");
          onSuccess();
        }
      },
      onError: (error) => {
        handleFormError(error, form.setError, "Login failed. Please try again.");
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-center">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
          <Input 
            size="md"
            label="Email" 
            required 
            autoComplete="email"
            {...form.register("email")} 
            error={form.formState.errors.email?.message as string} 
          />
          <PasswordInput 
            size="md"
            label="Password" 
            required 
            autoComplete="current-password"
            {...form.register("password")} 
            error={form.formState.errors.password?.message as string} 
          />
          <Button type="submit" variant="brand" disabled={isPending} className="w-full mt-2">
            {isPending ? "Logging in..." : "Login"}
          </Button>
          <div className="text-center text-sm mt-4">
            New User?{" "}
            <Link 
              href={registerCallbackUrl ? `/auth/register?callbackUrl=${registerCallbackUrl}` : "/auth/register"} 
              className="text-brand hover:underline font-medium"
            >
              Create an account
            </Link>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
