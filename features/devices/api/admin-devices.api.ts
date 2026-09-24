import api from "@/lib/axios";
import { AdminDevice, ApiResponse } from "@/types/admin";

type StatusFlag = { isActive?: boolean };

interface RawDevice extends StatusFlag {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
}

const normalizeStatus = (raw: StatusFlag) => Boolean(raw.isActive);

const normalizeDevice = (raw: RawDevice): AdminDevice => ({
  id: raw.id,
  name: raw.name,
  slug: raw.slug,
  icon: raw.icon,
  isActive: normalizeStatus(raw),
  created_at: raw.created_at ?? raw.createdAt ?? "",
  updated_at: raw.updated_at ?? raw.updatedAt ?? "",
});

export const devicesApi = {
  getDevices: async () => {
    const response = await api.get<ApiResponse<RawDevice[]>>("/admin/devices?includeInactive=1");
    return { ...response.data, data: (response.data.data ?? []).map(normalizeDevice) };
  },

  createDevice: async (data: FormData) => {
    const response = await api.post<ApiResponse<AdminDevice>>("/admin/devices", data);
    return response.data;
  },

  updateDevice: async ({ id, data }: { id: number; data: FormData }) => {
    data.append("_method", "PUT");
    const response = await api.post<ApiResponse<AdminDevice>>(`/admin/devices/${id}`, data);
    return response.data;
  },

  deleteDevice: async (id: number) => {
    const response = await api.delete(`/admin/devices/${id}`);
    return response.data;
  },
};
