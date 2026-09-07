"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const trackSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
});

type TrackFormValues = z.infer<typeof trackSchema>;

export function TrackForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TrackFormValues>({
    resolver: zodResolver(trackSchema),
    defaultValues: {
      orderId: searchParams.get("orderId") || "",
    },
  });

  const onSubmit = (data: TrackFormValues) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("orderId", data.orderId);
    router.push(`?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md mt-8 px-4 md:px-0">
      <div
        className={`relative flex items-center w-full h-14 rounded-full overflow-hidden bg-white border ${errors.orderId ? "border-red-500" : "border-gray-200"} focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all`}>
        <input
          type="text"
          placeholder="Enter your Order ID (WFX-...)"
          {...register("orderId")}
          autoComplete="off"
          className="flex-1 w-full h-full pl-6 pr-2 bg-transparent outline-none text-base placeholder:text-muted-foreground [&:-webkit-autofill]:shadow-[0_0_0px_1000px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:theme(colors.primary.DEFAULT)]"
        />
        <div className="pr-1.5 shrink-0">
          <button
            type="submit"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
      {errors.orderId && (
        <p className="text-red-500 text-sm mt-2 pl-4 text-left w-full">
          {errors.orderId.message}
        </p>
      )}
    </form>
  );
}
