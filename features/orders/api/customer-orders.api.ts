import api from "@/lib/axios";
import { CustomerOrder, CustomerOrderDetail } from "../types/order.types";
import { ApiResponse, PaginatedResponse } from "@/types/admin";

export const customerOrdersApi = {
  getOrders: async (params?: { page?: number; perPage?: number }) => {
    const response = await api.get<PaginatedResponse<CustomerOrder>>("/orders", {
      params,
    });
    return response.data;
  },

  getOrder: async (reference: string) => {
    const response = await api.get<ApiResponse<CustomerOrderDetail>>(`/orders/${reference}`);
    return response.data.data;
  },
};
