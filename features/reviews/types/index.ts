export interface AdminReview {
  id: number;
  product_id: number;
  user_id: number;
  rating: number;
  comment: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  product?: {
    id: number;
    title: string;
    slug: string;
    image: string;
  };
}

export interface ReviewsResponse {
  status: string;
  message: string;
  data: AdminReview[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
