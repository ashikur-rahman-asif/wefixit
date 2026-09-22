import axios from "@/lib/axios";
import { AdminRepair, AdminRepairDetail, PaginatedResponse, ApiResponse } from "@/types/admin";

export const repairsApi = {
  getRepairs: async (params?: {
    page?: number;
    perPage?: number;
    status?: string;
    search?: string;
  }) => {
    const response = await axios.get<PaginatedResponse<AdminRepair>>("/admin/repairs", {
      params,
    });
    return response.data;
  },

  getRepair: async (reference: string) => {
    const response = await axios.get<ApiResponse<AdminRepairDetail>>(`/admin/repairs/${reference}`);
    return response.data.data;
  },

  updateRepair: async (
    reference: string,
    data: {
      status?: string;
      diagnosisNotes?: string;
      partsCost?: number;
      serviceCharge?: number;
    },
  ) => {
    const response = await axios.put<ApiResponse<AdminRepairDetail>>(
      `/admin/repairs/${reference}`,
      data,
    );
    return response.data.data;
  },

  deleteRepair: async (reference: string) => {
    const response = await axios.delete<ApiResponse<null>>(`/admin/repairs/${reference}`);
    return response.data;
  },

  revertRepair: async (reference: string) => {
    const response = await axios.post<ApiResponse<AdminRepairDetail>>(
      `/admin/repairs/${reference}/revert`,
    );
    return response.data.data;
  },

  deleteEvent: async (reference: string, eventId: number) => {
    const response = await axios.delete<ApiResponse<AdminRepairDetail>>(
      `/admin/repairs/${reference}/events/${eventId}`,
    );
    return response.data.data;
  },
};
