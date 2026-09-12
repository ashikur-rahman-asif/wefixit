"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StarRating } from "@/components/ui/star-rating";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Product } from "@/types/product";
import { Star } from "lucide-react";
import { useState } from "react";

interface ProductReviewsProps {
  product: Product;
}

export function ProductReviews({ product }: ProductReviewsProps) {
  const hasReviews = product.reviewsCount && product.reviewsCount > 0;
  const [rating, setRating] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  const mockReviews = Array.from({ length: product.reviewsCount || 0 }).map(
    (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      rating: i % 7 === 0 ? 3 : i % 3 === 0 ? 4 : 5,
      date: `${(i % 30) + 1} days ago`,
      comment:
        i % 2 === 0
          ? "This is a great product! I highly recommend it. It works perfectly and the quality is outstanding. Definitely worth the price."
          : "Really good product. Met my expectations and the build quality is solid.",
    }),
  );

  const visibleReviews = mockReviews.slice(0, visibleCount);

  return (
    <div className="mt-6 md:mt-10 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">Customer Reviews</h2>
          <div className="flex items-center gap-2 mt-2">
            <StarRating rating={hasReviews ? product.rating || 0 : 0} />
            <p className="text-secondary font-medium">
              {hasReviews
                ? `${product.rating} out of 5 (${product.reviewsCount} Reviews)`
                : "0 Review"}
            </p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger render={<Button />}>Write a Review</DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Write a Review</DialogTitle>
              <DialogDescription>
                Share your experience with this product.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="rating" className="text-sm font-medium">
                  Rating
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      onClick={() => setRating(i)}
                      className={cn(
                        "size-7 cursor-pointer transition-colors",
                        rating >= i
                          ? "text-gold fill-gold"
                          : "text-black/20 fill-transparent",
                      )}
                    />
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="review" className="text-sm font-medium">
                  Review
                </label>
                <Textarea
                  id="review"
                  placeholder="What did you like or dislike?"
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Submit Review</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-2">
        {!hasReviews ? (
          <div className="text-center py-12 md:py-16 bg-muted/30 rounded-xl border border-border/50">
            <p className="text-lg md:text-xl font-medium text-primary">
              No reviews yet
            </p>
            <p className="text-secondary mt-2">
              Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {visibleReviews.map((review) => (
              <div
                key={review.id}
                className="border-b pb-6 last:border-0 last:pb-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-12 rounded-full bg-brand/10 flex items-center justify-center font-bold text-brand">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-primary">{review.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <StarRating rating={review.rating} />
                      <span className="text-xs text-secondary">
                        • {review.date}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-secondary text-sm md:text-base leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}

            {visibleCount < mockReviews.length && (
              <div className="text-center mt-4">
                <Button
                  variant="outline"
                  onClick={() => setVisibleCount((prev) => prev + 3)}>
                  Load More Reviews
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
