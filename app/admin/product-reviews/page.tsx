"use client";

import { ReviewTable } from "./_components/ReviewTable";
import { useAdminReviews } from "@/features/reviews/hooks/use-admin-reviews";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductReviewsPage() {
  const [status, setStatus] = useState<string>("all");

  const { data, isLoading, toggleApproval, isToggling } = useAdminReviews({
    status: status === "all" ? undefined : status,
  });

  return (
    <div className="p-6 md:p-10 max-w-[1600px] mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-[28px] md:text-[32px] font-bold text-titleBlack leading-tight tracking-tight">
            Product Reviews
          </h1>
          <p className="text-textGray mt-2 text-[15px] font-medium max-w-2xl leading-relaxed">
            Manage and approve customer reviews for your products.
          </p>
        </div>
      </div>
      
      <div className="mb-6 flex justify-end">
        <Select value={status} onValueChange={(val) => setStatus(val || "all")}>
          <SelectTrigger className="w-[180px] h-10 bg-white border-gray-200">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Reviews</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ReviewTable
        reviews={data?.data || []}
        isLoading={isLoading}
        onToggleStatus={toggleApproval}
        isToggling={isToggling}
      />
    </div>
  );
}
