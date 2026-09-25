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
import { Product } from "@/features/products/types/product.types";
import { useProductReviews, useSubmitReview } from "@/features/reviews/hooks/use-reviews";
import { handleFormError } from "@/lib/handle-form-error";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating between 1 and 5").max(5),
  review: z.string().max(2000, "Review must be less than 2000 characters"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ProductReviewsProps {
  product: Product;
}

export function ProductReviews({ product }: ProductReviewsProps) {
  const [visibleCount, setVisibleCount] = useState(3);

  const { data: reviewsResponse, isLoading } = useProductReviews(product.slug, {
    perPage: visibleCount,
  });
  const reviews = reviewsResponse?.data || [];
  const totalReviews = reviewsResponse?.meta?.total || product.reviewsCount || 0;
  const hasReviews = totalReviews > 0;
  const { isAuthenticated } = useAuthStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { mutate: submitReview, isPending } = useSubmitReview(product.slug);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, review: "" },
  });

  const rating = useWatch({ control, name: "rating" });

  const onSubmit = (data: ReviewFormData) => {
    submitReview(
      { rating: data.rating, comment: data.review },
      {
        onSuccess: () => {
          reset();
          setIsDialogOpen(false);
        },
        onError: (error) => {
          handleFormError(error, setError, "Failed to submit review.");
        },
      },
    );
  };

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  return (
    <div className="mt-2 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">Customer Reviews</h2>
          <div className="flex items-center gap-2 mt-2">
            <StarRating rating={hasReviews ? product.rating || 0 : 0} />
            <p className="text-secondary font-medium">
              {hasReviews ? `${product.rating} out of 5 (${totalReviews} Reviews)` : "0 Review"}
            </p>
          </div>
        </div>

        {mounted && isAuthenticated && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger render={<Button />}>Write a Review</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <DialogHeader>
                  <DialogTitle>Write a Review</DialogTitle>
                  <DialogDescription>Share your experience with this product.</DialogDescription>
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
                          onClick={() => setValue("rating", i, { shouldValidate: true })}
                          className={cn(
                            "size-7 cursor-pointer transition-colors",
                            rating >= i ? "text-gold fill-gold" : "text-black/20 fill-transparent",
                          )}
                        />
                      ))}
                    </div>
                    {errors.rating && (
                      <p className="text-sm font-medium text-red-500">{errors.rating.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="review" className="text-sm font-medium">
                      Review
                    </label>
                    <Textarea
                      id="review"
                      placeholder="What did you like or dislike?"
                      className="min-h-[100px]"
                      {...register("review")}
                    />
                    {errors.review && (
                      <p className="text-sm font-medium text-red-500">{errors.review.message}</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Submitting..." : "Submit Review"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="mt-2">
        {isLoading && reviews.length === 0 ? (
          <div className="grid gap-6">
            {Array.from({
              length: product.reviewsCount ? Math.min(product.reviewsCount, visibleCount) : 1,
            }).map((_, i) => (
              <div key={i} className="border-b pb-6 last:border-0 last:pb-0 animate-pulse">
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-12 rounded-full bg-muted"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-muted rounded"></div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-24 bg-muted rounded"></div>
                      <div className="h-3 w-16 bg-muted rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full max-w-2xl bg-muted rounded"></div>
                  <div className="h-4 w-5/6 max-w-xl bg-muted rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : !hasReviews ? (
          <div className="text-center py-12 md:py-16 bg-muted/30 rounded-xl border border-border/50">
            <p className="text-lg md:text-xl font-medium text-primary">No reviews yet</p>
            <p className="text-secondary mt-2">Be the first to share your thoughts!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-0 last:pb-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-12 rounded-full bg-brand/10 flex items-center justify-center font-bold text-brand uppercase">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-primary">{review.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <StarRating rating={review.rating} />
                      <span className="text-xs text-secondary">• {review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-secondary text-sm md:text-base leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}

            {visibleCount < totalReviews && (
              <div className="text-center mt-4">
                <Button
                  variant="outline"
                  onClick={() => setVisibleCount((prev) => prev + 3)}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Load More Reviews"}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
