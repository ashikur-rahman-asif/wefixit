import api from "@/lib/axios";
import { ReviewsResponse } from "../types";

export const adminReviewsApi = {
  getReviews: async (params?: { page?: number; perPage?: number; status?: string }) => {
    const response = await api.get<ReviewsResponse>("/admin/reviews", { params });
    return response.data;
  },

  toggleApproval: async (id: number) => {
    const response = await api.patch<{ status: string; message: string; data: unknown }>(
      `/admin/reviews/${id}/toggle-approval`
    );
    return response.data;
  },
};
