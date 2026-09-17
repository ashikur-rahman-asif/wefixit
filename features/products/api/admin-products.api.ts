import api from "@/lib/axios";
import { AdminProduct, PaginatedResponse, ApiResponse } from "@/types/admin";

interface GetProductsParams {
  page?: number;
  search?: string;
  perPage?: number;
  category?: string;
  brand?: string;
  device?: string;
  status?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const productsApi = {
  getProducts: async (params?: GetProductsParams) => {
    const response = await api.get<PaginatedResponse<AdminProduct>>("/products", { params });
    return response.data;
  },

  getProduct: async (id: number | string) => {
    const response = await api.get<ApiResponse<AdminProduct>>(`/products/${id}`);
    return response.data.data;
  },

  createProduct: async (data: FormData) => {
    const response = await api.post<ApiResponse<AdminProduct>>("/products", data);
    return response.data;
  },

  updateProduct: async ({ id, data }: { id: number; data: FormData }) => {
    data.append("_method", "PUT");
    const response = await api.post<ApiResponse<AdminProduct>>(`/products/${id}`, data);
    return response.data;
  },

  deleteProduct: async (id: number) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};
