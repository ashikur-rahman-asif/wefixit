"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { trackSchema, TrackFormValues } from "@/features/orders/schemas/track-order.schema";
import { cn } from "@/lib/utils";

export function TrackForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TrackFormValues>({
    resolver: zodResolver(trackSchema),
    defaultValues: {
      orderId: searchParams.get("orderId") || "",
      email: searchParams.get("email") || "",
    },
  });

  const orderIdValue = useWatch({ control, name: "orderId" }) || "";
  const isOrder = orderIdValue.toUpperCase().startsWith("ORD-");

  const onSubmit = (data: TrackFormValues) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("orderId", data.orderId.toUpperCase());
    if (isOrder && data.email) {
      params.set("email", data.email);
    } else {
      params.delete("email");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md mt-8 px-4 md:px-0 flex flex-col gap-4"
    >
      <div className="w-full">
        <div
          className={cn(
            "relative flex items-center w-full h-14 rounded-full overflow-hidden bg-white border focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all",
            errors.orderId ? "border-red-500" : "border-gray-200",
          )}
        >
          <input
            type="text"
            placeholder="Tracking ID (e.g., ORD-... or WFX-...)"
            {...register("orderId")}
            autoComplete="off"
            className="flex-1 w-full h-full pl-6 pr-2 bg-transparent outline-none text-base placeholder:text-muted-foreground [&:-webkit-autofill]:shadow-[0_0_0px_1000px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:theme(colors.primary.DEFAULT)] uppercase"
          />
          <div className="pr-1.5 shrink-0">
            <button
              type="submit"
              className="flex items-center justify-center w-11 h-11 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
        {errors.orderId && (
          <p className="text-red-500 text-sm mt-2 pl-4 text-left w-full">
            {errors.orderId.message}
          </p>
        )}
      </div>

      <div
        className={cn(
          "w-full transition-all duration-300 ease-in-out overflow-hidden",
          isOrder ? "max-h-24 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div
          className={cn(
            "relative flex items-center w-full h-14 rounded-full overflow-hidden bg-white border focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all",
            errors.email ? "border-red-500" : "border-gray-200",
          )}
        >
          <input
            type="email"
            placeholder="Email address used for the order"
            {...register("email")}
            autoComplete="email"
            className="flex-1 w-full h-full px-6 bg-transparent outline-none text-base placeholder:text-muted-foreground [&:-webkit-autofill]:shadow-[0_0_0px_1000px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:theme(colors.primary.DEFAULT)]"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-2 pl-4 text-left w-full">{errors.email.message}</p>
        )}
      </div>
    </form>
  );
}
