import api from "@/lib/axios";
import { DashboardResponse } from "@/types/admin";

export const dashboardApi = {
  getDashboardStats: async () => {
    const response = await api.get<DashboardResponse>("/admin/stats");
    return response.data;
  },
};
