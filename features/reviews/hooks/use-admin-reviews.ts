import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { adminReviewsApi } from "../api/admin-reviews.api";

export function useAdminReviews(params?: { page?: number; perPage?: number; status?: string }) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["admin-reviews", params],
    queryFn: () => adminReviewsApi.getReviews(params),
  });

  const toggleApprovalMutation = useMutation({
    mutationFn: adminReviewsApi.toggleApproval,
    onSuccess: (data) => {
      toast.success(data.message || "Review status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data?.message || "Failed to update review status"
      );
    },
  });

  return {
    ...query,
    toggleApproval: toggleApprovalMutation.mutate,
    isToggling: toggleApprovalMutation.isPending,
  };
}
