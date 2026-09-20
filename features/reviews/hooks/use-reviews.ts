import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { reviewsApi } from "../api/reviews.api";

export function useProductReviews(productSlug: string, params?: { page?: number; perPage?: number }) {
  return useQuery({
    queryKey: ["product-reviews", productSlug, params],
    queryFn: () => reviewsApi.getProductReviews(productSlug, params),
    enabled: !!productSlug,
  });
}

export function useSubmitReview(productSlug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { rating: number; comment: string }) =>
      reviewsApi.submitReview(productSlug, data),
    onSuccess: (data) => {
      toast.success(data.message || "Review submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["product-reviews", productSlug] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data?.message || "Failed to submit review."
      );
    },
  });
}
