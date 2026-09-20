import api from "@/lib/axios";

export interface Review {
  id: number;
  rating: number;
  comment: string | null;
  name: string;
  date: string;
  createdAt: string;
}

export interface PaginatedReviews {
  data: Review[];
  meta: {
    currentPage: number;
    lastPage: number;
    total: number;
  };
}

export const reviewsApi = {
  getProductReviews: async (productSlug: string, params?: { page?: number; perPage?: number }) => {
    const response = await api.get<PaginatedReviews>(`/products/${productSlug}/reviews`, { params });
    return response.data;
  },

  submitReview: async (productSlug: string, data: { rating: number; comment: string }) => {
    const response = await api.post(`/products/${productSlug}/reviews`, data);
    return response.data;
  },
};
