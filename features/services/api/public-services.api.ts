import api from "@/lib/axios";
import { ApiResponse } from "@/types/admin";

export interface Service {
  id: number;
  name: string;
  slug: string;
  icon?: string | null;
  deviceIds?: number[];
}

export const publicServicesApi = {
  getServices: async () => {
    const response = await api.get<ApiResponse<Service[]>>("/services");
    return response.data;
  },
};
