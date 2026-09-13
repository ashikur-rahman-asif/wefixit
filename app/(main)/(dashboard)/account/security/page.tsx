"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PasswordInput } from "@/components/form-elements/password-input/password-input";
import { useState } from "react";
import { toast } from "sonner";

export default function SecurityPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Password updated successfully!");
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl border border-border/50 p-5 md:p-8">
      <div className="mb-5 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-primary">Change Password</h1>
        <p className="text-gray-500 mt-1 text-xs md:text-sm">Ensure your account is using a long, random password to stay secure.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
        <PasswordInput
          size="md"
          label="Current Password"
          placeholder="••••••••"
          required
        />
        
        <PasswordInput
          size="md"
          label="New Password"
          placeholder="••••••••"
          required
          minLength={8}
        />

        <PasswordInput
          size="md"
          label="Confirm New Password"
          placeholder="••••••••"
          required
          minLength={8}
        />

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={cn(buttonVariants({ variant: "brand" }), "w-full md:w-auto min-w-35")}
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
}
