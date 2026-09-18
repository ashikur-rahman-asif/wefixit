import api from "@/lib/axios";
import { AdminProductDevice, PaginatedResponse, ApiResponse } from "@/types/admin";

interface GetProductDevicesParams {
  page?: number;
  search?: string;
  per_page?: number;
}

export const productDevicesApi = {
  getDevices: async (params?: GetProductDevicesParams) => {
    const response = await api.get<PaginatedResponse<AdminProductDevice>>("/admin/product-devices", { params });
    return response.data;
  },

  getAllDevices: async () => {
    const response = await api.get<ApiResponse<AdminProductDevice[]>>("/admin/product-devices?all=1");
    return response.data.data;
  },

  createDevice: async (data: FormData) => {
    const response = await api.post<ApiResponse<AdminProductDevice>>("/admin/product-devices", data);
    return response.data;
  },

  updateDevice: async ({ id, data }: { id: number; data: FormData }) => {
    data.append("_method", "PUT");
    const response = await api.post<ApiResponse<AdminProductDevice>>(`/admin/product-devices/${id}`, data);
    return response.data;
  },

  deleteDevice: async (id: number) => {
    const response = await api.delete(`/admin/product-devices/${id}`);
    return response.data;
  },
};
