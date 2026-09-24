import api from "@/lib/axios";
import { AdminColor, ApiResponse } from "@/types/admin";

type StatusFlag = { isActive?: boolean };

interface RawColor extends StatusFlag {
  id: number;
  name: string;
  hex: string;
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
}

const normalizeStatus = (raw: StatusFlag) => Boolean(raw.isActive);

const normalizeColor = (raw: RawColor): AdminColor => ({
  id: raw.id,
  name: raw.name,
  hex: raw.hex,
  isActive: normalizeStatus(raw),
  created_at: raw.created_at ?? raw.createdAt ?? "",
  updated_at: raw.updated_at ?? raw.updatedAt ?? "",
});

export const colorsApi = {
  getColors: async () => {
    const response = await api.get<ApiResponse<RawColor[]>>("/admin/colors?includeInactive=1");
    return { ...response.data, data: (response.data.data ?? []).map(normalizeColor) };
  },

  createColor: async (data: { name: string; hex: string; isActive: boolean }) => {
    const response = await api.post<ApiResponse<AdminColor>>("/admin/colors", data);
    return response.data;
  },

  updateColor: async ({
    id,
    data,
  }: {
    id: number;
    data: { name?: string; hex?: string; isActive?: boolean };
  }) => {
    const response = await api.put<ApiResponse<AdminColor>>(`/admin/colors/${id}`, data);
    return response.data;
  },

  deleteColor: async (id: number) => {
    const response = await api.delete(`/admin/colors/${id}`);
    return response.data;
  },
};
