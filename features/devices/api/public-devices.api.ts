import api from "@/lib/axios";
import { ApiResponse } from "@/types/admin";
import { Device } from "@/features/repairs/types/repair.types";

export const publicDevicesApi = {
  getDevices: async () => {

    const response = await api.get<ApiResponse<Device[]>>("/devices");

    return response.data;
  },
};
