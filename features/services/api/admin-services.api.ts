import api from "@/lib/axios";
import { AdminService, ApiResponse } from "@/types/admin";

type StatusFlag = { isActive?: boolean; is_active?: boolean };

interface RawService extends StatusFlag {
  id: number;
  name: string;
  slug: string;
  icon?: string | null;
  deviceIds?: number[];
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
}

const normalizeStatus = (raw: StatusFlag) => Boolean(raw.isActive ?? raw.is_active);

const normalizeService = (raw: RawService): AdminService => ({
  id: raw.id,
  name: raw.name,
  slug: raw.slug,
  icon: raw.icon ?? null,
  deviceIds: (raw.deviceIds || []).map(Number),
  isActive: normalizeStatus(raw),
  created_at: raw.created_at ?? raw.createdAt ?? "",
  updated_at: raw.updated_at ?? raw.updatedAt ?? "",
});

export const servicesApi = {
  getServices: async () => {
    const response = await api.get<ApiResponse<RawService[]>>("/services?includeInactive=1");
    return { ...response.data, data: (response.data.data ?? []).map(normalizeService) };
  },

  createService: async (data: FormData) => {
    const response = await api.post<ApiResponse<AdminService>>("/services", data);
    return response.data;
  },

  updateService: async ({ id, data }: { id: number; data: FormData }) => {
    data.append("_method", "PUT");
    const response = await api.post<ApiResponse<AdminService>>(`/services/${id}`, data);
    return response.data;
  },

  deleteService: async (id: number) => {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  },
};
