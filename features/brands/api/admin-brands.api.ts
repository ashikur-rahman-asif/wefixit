import api from "@/lib/axios";
import { AdminBrand, ApiResponse } from "@/types/admin";

type StatusFlag = { isActive?: boolean };

interface RawBrand extends StatusFlag {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  deviceName?: string | null;
  device_name?: string | null;
  deviceIds?: number[];
  device_ids?: number[];
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
}

const normalizeStatus = (raw: StatusFlag) => Boolean(raw.isActive);

const normalizeBrand = (raw: RawBrand): AdminBrand => ({
  id: raw.id,
  name: raw.name,
  slug: raw.slug,
  icon: raw.icon,
  device_name: raw.device_name ?? raw.deviceName ?? null,
  deviceIds: (raw.deviceIds ?? raw.device_ids ?? []).map(Number),
  isActive: normalizeStatus(raw),
  created_at: raw.created_at ?? raw.createdAt ?? "",
  updated_at: raw.updated_at ?? raw.updatedAt ?? "",
});

export const brandsApi = {
  getBrands: async () => {
    const response = await api.get<ApiResponse<RawBrand[]>>("/admin/brands?includeInactive=1");
    return { ...response.data, data: (response.data.data ?? []).map(normalizeBrand) };
  },

  createBrand: async (data: FormData) => {
    const response = await api.post<ApiResponse<AdminBrand>>("/admin/brands", data);
    return response.data;
  },

  updateBrand: async ({ id, data }: { id: number; data: FormData }) => {
    data.append("_method", "PUT");
    const response = await api.post<ApiResponse<AdminBrand>>(`/admin/brands/${id}`, data);
    return response.data;
  },

  deleteBrand: async (id: number) => {
    const response = await api.delete(`/admin/brands/${id}`);
    return response.data;
  },
};
