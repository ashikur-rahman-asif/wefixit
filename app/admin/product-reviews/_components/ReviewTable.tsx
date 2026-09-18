"use client";

import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { AdminReview } from "@/features/reviews/types";
import { Star, MessageSquare } from "lucide-react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ReviewTableProps {
  reviews: AdminReview[];
  isLoading: boolean;
  onToggleStatus: (id: number) => void;
  isToggling: boolean;
}

export function ReviewTable({
  reviews,
  isLoading,
  onToggleStatus,
  isToggling,
}: ReviewTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-[20px] border border-gray-100 p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-[20px] border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <MessageSquare className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-titleBlack mb-1">
          No reviews found
        </h3>
        <p className="text-textGray">There are no reviews to display yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[20px] border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="border-b-gray-100 hover:bg-transparent">
              <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                Product
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                Customer
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                Rating
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                Review
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                Approved
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => {
              return (
                <TableRow key={review.id}>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                        {review.product?.image ? (
                          <Image
                            src={review.product.image}
                            alt={review.product.title || ""}
                            fill
                            className="object-cover"
                          />
                        ) : null}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-titleBlack line-clamp-1 max-w-[200px]">
                          {review.product?.title || "Unknown Product"}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div>
                      <div className="text-sm font-semibold text-titleBlack">
                        {review.user?.name || "Anonymous"}
                      </div>
                      <div className="text-xs font-medium text-textGray mt-0.5">
                        {review.user?.email || ""}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-4 h-4",
                            i < review.rating
                              ? "fill-amber-400 text-amber-400"
                              : "fill-gray-100 text-gray-100"
                          )}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <p className="text-sm text-textGray line-clamp-2 max-w-[300px]" title={review.comment}>
                      {review.comment || <span className="italic">No comment provided</span>}
                    </p>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={review.is_approved}
                        onCheckedChange={() => onToggleStatus(review.id)}
                        disabled={isToggling}
                      />
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          review.is_approved ? "text-titleBlack" : "text-textGray",
                        )}>
                        {review.is_approved ? "Yes" : "No"}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
