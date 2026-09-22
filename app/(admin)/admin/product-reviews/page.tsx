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
  const [pendingStatuses, setPendingStatuses] = useState<Record<number, boolean>>({});
  const [isSaving, setIsSaving] = useState(false);

  const { data, isLoading, toggleApprovalAsync } = useAdminReviews({
    status: status === "all" ? undefined : status,
  });

  const handleToggleStatus = (id: number, newStatus: boolean) => {
    setPendingStatuses((prev) => {
      const next = { ...prev };
      const review = data?.data.find((r) => r.id === id);
      if (!review) return next;

      if (review.is_approved === newStatus) {
        delete next[id];
      } else {
        next[id] = newStatus;
      }
      return next;
    });
  };

  const handleSaveStatuses = async () => {
    setIsSaving(true);
    try {
      const changedIds = Object.keys(pendingStatuses).map(Number);
      await Promise.all(changedIds.map((id) => toggleApprovalAsync(id)));
      setPendingStatuses({});
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const hasPendingChanges = Object.keys(pendingStatuses).length > 0;

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
        <Select value={status} onValueChange={(val: string | null) => setStatus(val || "all")}>
          <SelectTrigger className="w-[180px] h-10 bg-white border-gray-200">
            <SelectValue placeholder="Filter by status">
              {status === "all"
                ? "All Reviews"
                : status === "pending"
                  ? "Pending"
                  : status === "approved"
                    ? "Approved"
                    : "Filter by status"}
            </SelectValue>
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
        onToggleStatus={handleToggleStatus}
        pendingStatuses={pendingStatuses}
        isToggling={isSaving}
      />

      {hasPendingChanges && (
        <div className="fixed bottom-0 left-0 lg:left-64 right-0 p-4 bg-white border-t border-gray-200 z-40 flex items-center justify-end gap-3 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <button
            onClick={() => setPendingStatuses({})}
            className="h-11 px-6 bg-gray-50 text-titleBlack rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveStatuses}
            disabled={isSaving}
            className="h-11 px-6 bg-brand text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}
      <div className="h-24"></div>
    </div>
  );
}
