import api from "@/lib/axios";
import { AdminProductCategory, PaginatedResponse, ApiResponse } from "@/types/admin";

interface GetProductCategoriesParams {
  page?: number;
  search?: string;
  per_page?: number;
}

export const productCategoriesApi = {
  getCategories: async (params?: GetProductCategoriesParams) => {
    const response = await api.get<PaginatedResponse<AdminProductCategory>>("/product-categories", { params });
    return response.data;
  },

  getAllCategories: async () => {
    
    const response = await api.get<ApiResponse<AdminProductCategory[]>>("/product-categories?all=1");
    return response.data.data;
  },

  createCategory: async (data: FormData) => {
    const response = await api.post<ApiResponse<AdminProductCategory>>("/product-categories", data);
    return response.data;
  },

  updateCategory: async ({ id, data }: { id: number; data: FormData }) => {
    data.append("_method", "PUT");
    const response = await api.post<ApiResponse<AdminProductCategory>>(`/product-categories/${id}`, data);
    return response.data;
  },

  deleteCategory: async (id: number) => {
    const response = await api.delete(`/product-categories/${id}`);
    return response.data;
  },
};
