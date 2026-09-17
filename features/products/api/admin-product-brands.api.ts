import api from "@/lib/axios";
import { AdminProductBrand, PaginatedResponse, ApiResponse } from "@/types/admin";

interface GetProductBrandsParams {
  page?: number;
  search?: string;
  per_page?: number;
}

export const productBrandsApi = {
  getBrands: async (params?: GetProductBrandsParams) => {
    const response = await api.get<PaginatedResponse<AdminProductBrand>>("/product-brands", { params });
    return response.data;
  },

  getAllBrands: async () => {
    const response = await api.get<ApiResponse<AdminProductBrand[]>>("/product-brands?all=1");
    return response.data.data;
  },

  createBrand: async (data: FormData) => {
    const response = await api.post<ApiResponse<AdminProductBrand>>("/product-brands", data);
    return response.data;
  },

  updateBrand: async ({ id, data }: { id: number; data: FormData }) => {
    data.append("_method", "PUT");
    const response = await api.post<ApiResponse<AdminProductBrand>>(`/product-brands/${id}`, data);
    return response.data;
  },

  deleteBrand: async (id: number) => {
    const response = await api.delete(`/product-brands/${id}`);
    return response.data;
  },
};
