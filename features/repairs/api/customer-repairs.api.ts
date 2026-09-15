import api from "@/lib/axios";
import { CustomerRepair, CustomerRepairDetail } from "../types/repair.types";
import { ApiResponse, PaginatedResponse } from "@/types/admin";

export const customerRepairsApi = {
  getRepairs: async (params?: { page?: number; perPage?: number }) => {
    const response = await api.get<PaginatedResponse<CustomerRepair>>("/repairs", {
      params,
    });
    return response.data;
  },

  getRepair: async (reference: string) => {
    const response = await api.get<ApiResponse<CustomerRepairDetail>>(`/repairs/${reference}`);
    return response.data.data;
  },
};
