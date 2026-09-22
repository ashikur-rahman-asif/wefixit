import api from "@/lib/axios";
import { ProductGrade } from "@/types/admin";

export const productGradesApi = {
  getProductGrades: async () => {
    const response = await api.get<{ status: string; message: string; data: ProductGrade[] }>(
      "/admin/product-grades",
    );
    return response.data.data;
  },
  createProductGrade: async (data: { name: string; description?: string; is_active: boolean }) => {
    const response = await api.post<{ status: string; message: string; data: ProductGrade }>(
      "/admin/product-grades",
      data,
    );
    return response.data.data;
  },
  updateProductGrade: async ({
    id,
    data,
  }: {
    id: number;
    data: { name: string; description?: string; is_active: boolean };
  }) => {
    const response = await api.put<{ status: string; message: string; data: ProductGrade }>(
      `/admin/product-grades/${id}`,
      data,
    );
    return response.data.data;
  },
  deleteProductGrade: async (id: number) => {
    const response = await api.delete<{ status: string; message: string }>(
      `/admin/product-grades/${id}`,
    );
    return response.data;
  },
};
