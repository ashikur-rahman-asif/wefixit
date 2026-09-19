"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useMounted } from "@/hooks/use-mounted";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/form-elements/input";
import { useState } from "react";
import { toast } from "sonner";
import { Pen } from "lucide-react";
import { useUpdateProfile } from "@/features/auth/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema, UpdateProfileInput } from "@/features/auth/schemas/user.schema";

export default function AddressPage() {
  const user = useAuthStore((state) => state.user);
  const mounted = useMounted();
  const [editable, setEditable] = useState(false);

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

  const onSubmit = (data: UpdateProfileInput) => {
    updateProfile(data, {
      onSuccess: (response) => {
        toast.success("Address updated successfully!");
        if (response?.data) {
          setAuth(response.data);
        }
        setEditable(false);
      },
      onError: () => {
        toast.error("Failed to update address. Please try again.");
      },
    });
  };

  if (!mounted) {
    return (
      <div className="bg-white rounded-xl border border-border/50 p-5 md:p-8 w-full">
        <div className="mb-5 md:mb-8">
          <div className="h-7 w-48 bg-gray-100 rounded-md animate-pulse"></div>
          <div className="mt-2 h-4 w-64 bg-gray-100 rounded-md animate-pulse"></div>
        </div>
        <div className="space-y-6 max-w-2xl mt-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="h-[68px] w-full bg-gray-100 rounded-xl animate-pulse"></div>
             <div className="h-[68px] w-full bg-gray-100 rounded-xl animate-pulse"></div>
           </div>
           <div className="h-[68px] w-full bg-gray-100 rounded-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  const hasDistrict = (user?.district?.length ?? 0) > 0;
  const hasUpazila = (user?.upazila?.length ?? 0) > 0;
  const hasStreetAddress = (user?.street_address?.length ?? 0) > 0;

  return (
    <div className="bg-white rounded-xl border border-border/50 p-5 md:p-8">
      <div className="mb-5 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-primary">Delivery Address</h1>
        <p className="text-gray-500 mt-1 text-xs md:text-sm">Set your delivery address for easy checkout.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              size="md"
              label="District"
              type="text"
              {...register("district")}
              error={errors.district?.message}
              placeholder="e.g. Dhaka"
              required
              readOnly={!editable && hasDistrict}
              inputClassName={(!editable && hasDistrict) ? "text-gray-500" : ""}
              suffix={
                <Pen
                  className={cn("w-4 h-4 cursor-pointer transition-colors", editable ? "text-brand" : "text-gray-400 hover:text-brand")}
                  onClick={() => setEditable(!editable)}
                />
              }
            />
            <Input
              size="md"
              label="Upazila"
              type="text"
              {...register("upazila")}
              error={errors.upazila?.message}
              placeholder="e.g. Banani"
              required
              readOnly={!editable && hasUpazila}
              inputClassName={(!editable && hasUpazila) ? "text-gray-500" : ""}
            />
          </div>

          <Input
            size="md"
            label="Village or Street Address"
            type="text"
            {...register("streetAddress")}
            error={errors.streetAddress?.message}
            placeholder="House 12, Road 5, Block C"
            required
            readOnly={!editable && hasStreetAddress}
            inputClassName={(!editable && hasStreetAddress) ? "text-gray-500" : ""}
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isPending || (!editable && hasStreetAddress)}
            className={cn(buttonVariants({ variant: "brand" }), "w-full md:w-auto min-w-35 disabled:opacity-50")}
          >
            {isPending ? "Saving..." : "Save Address"}
          </button>
        </div>
      </form>
    </div>
  );
}
