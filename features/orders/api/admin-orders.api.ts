import api from "@/lib/axios";
import { AdminOrder, AdminOrderDetail, PaginatedResponse } from "@/types/admin";

export const ordersApi = {
  getOrders: async (params?: Record<string, string | number | undefined>) => {
    const response = await api.get<PaginatedResponse<AdminOrder>>("/admin/orders", { params });
    return response.data;
  },
  getOrder: async (reference: string) => {
    const response = await api.get<{ status: string; message: string; data: AdminOrderDetail }>(
      `/admin/orders/${reference}`,
    );
    return response.data.data;
  },
  updateOrder: async ({
    reference,
    data,
  }: {
    reference: string;
    data: { status?: string; paymentStatus?: string; note?: string };
  }) => {
    const response = await api.put<{ status: string; message: string; data: AdminOrderDetail }>(
      `/admin/orders/${reference}`,
      data,
    );
    return response.data.data;
  },
  deleteOrder: async (reference: string) => {
    const response = await api.delete<{ status: string; message: string }>(
      `/admin/orders/${reference}`,
    );
    return response.data;
  },
};
