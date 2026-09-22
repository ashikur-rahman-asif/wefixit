"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useMounted } from "@/hooks/use-mounted";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/form-elements/input";
import { Pen } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useUpdateProfile } from "@/features/auth/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema, UpdateProfileInput } from "@/features/auth/schemas/user.schema";

export default function AccountPage() {
  const user = useAuthStore((state) => state.user);
  const mounted = useMounted();
  const [manualEdit, setManualEdit] = useState<Record<string, boolean>>({});

  const editable = {
    firstName: manualEdit.firstName ?? !user?.first_name,
    lastName: manualEdit.lastName ?? !user?.last_name,
    phone: manualEdit.phone ?? !user?.phone,
    district: manualEdit.district ?? !user?.district,
    upazila: manualEdit.upazila ?? !user?.upazila,
    streetAddress: manualEdit.streetAddress ?? !user?.street_address,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    values: {
      firstName: user?.first_name || "",
      lastName: user?.last_name || "",
      phone: user?.phone || "",
      district: user?.district || "",
      upazila: user?.upazila || "",
      streetAddress: user?.street_address || "",
    },
  });

  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const setAuth = useAuthStore((state) => state.setAuth);

  const toggleEdit = (field: keyof typeof editable) => {
    setManualEdit((prev) => ({ ...prev, [field]: !editable[field] }));
  };

  const onSubmit = (data: UpdateProfileInput) => {
    updateProfile(data, {
      onSuccess: (response) => {
        toast.success("Profile updated successfully!");
        if (response?.data) {
          setAuth(response.data);
        }
      },
      onError: () => {
        toast.error("Failed to update profile. Please try again.");
      },
    });
  };

  if (!mounted) {
    return (
      <div className="bg-white rounded-xl border border-border/50 p-5 md:p-8 w-full">
        <div className="mb-5 md:mb-6">
          <div className="h-7 w-48 bg-gray-100 rounded-md animate-pulse"></div>
          <div className="mt-2 h-4 w-64 bg-gray-100 rounded-md animate-pulse"></div>
        </div>
        <div className="space-y-6 max-w-2xl mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-[68px] w-full bg-gray-100 rounded-xl animate-pulse"></div>
            <div className="h-[68px] w-full bg-gray-100 rounded-xl animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-[88px] w-full bg-gray-100 rounded-xl animate-pulse"></div>
            <div className="h-[68px] w-full bg-gray-100 rounded-xl animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-[68px] w-full bg-gray-100 rounded-xl animate-pulse"></div>
            <div className="h-[68px] w-full bg-gray-100 rounded-xl animate-pulse"></div>
          </div>
          <div>
            <div className="h-[68px] w-full bg-gray-100 rounded-xl animate-pulse"></div>
          </div>
          <div className="pt-4">
            <div className="h-12 w-32 bg-gray-100 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-border/50 p-5 md:p-8">
      <div className="mb-5 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-primary">Profile Information</h1>
        <p className="text-gray-500 mt-1 text-xs md:text-sm">Update your personal details below.</p>
      </div>

      <form
        key={user?.id || "form-loading"}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            size="md"
            label="First Name"
            {...register("firstName")}
            type="text"
            placeholder="John"
            required
            readOnly={!editable.firstName}
            error={errors.firstName?.message}
            inputClassName={!editable.firstName ? "text-gray-500" : ""}
            suffix={
              user?.first_name ? (
                <Pen
                  className={cn(
                    "w-4 h-4 cursor-pointer transition-colors",
                    editable.firstName ? "text-brand" : "text-gray-400 hover:text-brand",
                  )}
                  onClick={() => toggleEdit("firstName")}
                />
              ) : null
            }
          />
          <Input
            size="md"
            label="Last Name"
            {...register("lastName")}
            type="text"
            placeholder="Doe"
            required
            readOnly={!editable.lastName}
            error={errors.lastName?.message}
            inputClassName={!editable.lastName ? "text-gray-500" : ""}
            suffix={
              user?.last_name ? (
                <Pen
                  className={cn(
                    "w-4 h-4 cursor-pointer transition-colors",
                    editable.lastName ? "text-brand" : "text-gray-400 hover:text-brand",
                  )}
                  onClick={() => toggleEdit("lastName")}
                />
              ) : null
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              size="md"
              label="Email Address"
              name="email"
              type="email"
              value={user?.email || ""}
              placeholder="john@example.com"
              disabled
            />
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
          </div>
          <Input
            size="md"
            label="Phone Number"
            {...register("phone")}
            type="tel"
            placeholder="+8801..."
            required
            readOnly={!editable.phone}
            error={errors.phone?.message}
            inputClassName={!editable.phone ? "text-gray-500" : ""}
            suffix={
              user?.phone ? (
                <Pen
                  className={cn(
                    "w-4 h-4 cursor-pointer transition-colors",
                    editable.phone ? "text-brand" : "text-gray-400 hover:text-brand",
                  )}
                  onClick={() => toggleEdit("phone")}
                />
              ) : null
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            size="md"
            label="District"
            {...register("district")}
            type="text"
            placeholder="e.g. Dhaka"
            readOnly={!editable.district}
            error={errors.district?.message}
            inputClassName={!editable.district ? "text-gray-500" : ""}
            suffix={
              user?.district ? (
                <Pen
                  className={cn(
                    "w-4 h-4 cursor-pointer transition-colors",
                    editable.district ? "text-brand" : "text-gray-400 hover:text-brand",
                  )}
                  onClick={() => toggleEdit("district")}
                />
              ) : null
            }
          />
          <Input
            size="md"
            label="Upazila"
            {...register("upazila")}
            type="text"
            placeholder="e.g. Banani"
            readOnly={!editable.upazila}
            error={errors.upazila?.message}
            inputClassName={!editable.upazila ? "text-gray-500" : ""}
            suffix={
              user?.upazila ? (
                <Pen
                  className={cn(
                    "w-4 h-4 cursor-pointer transition-colors",
                    editable.upazila ? "text-brand" : "text-gray-400 hover:text-brand",
                  )}
                  onClick={() => toggleEdit("upazila")}
                />
              ) : null
            }
          />
        </div>

        <div>
          <Input
            size="md"
            label="Village or Street Address"
            {...register("streetAddress")}
            type="text"
            placeholder="e.g. House 12, Road 5, Block C"
            readOnly={!editable.streetAddress}
            error={errors.streetAddress?.message}
            inputClassName={!editable.streetAddress ? "text-gray-500" : ""}
            suffix={
              user?.street_address ? (
                <Pen
                  className={cn(
                    "w-4 h-4 cursor-pointer transition-colors",
                    editable.streetAddress ? "text-brand" : "text-gray-400 hover:text-brand",
                  )}
                  onClick={() => toggleEdit("streetAddress")}
                />
              ) : null
            }
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isPending}
            className={cn(buttonVariants({ variant: "brand" }), "w-full md:w-auto min-w-35")}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
