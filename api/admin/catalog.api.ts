import api from "@/lib/axios";
import {
  AdminCategory,
  AdminBrand,
  AdminColor,
  AdminDevice,
  ApiResponse,
} from "@/types/admin";

// The catalog API returns camelCase flags (isActive/deviceName); the admin
// components consume snake_case, so normalize once at the API boundary.
type StatusFlag = { isActive?: boolean; is_active?: boolean };

interface RawCategory extends StatusFlag {
  id: number;
  name: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
}

interface RawBrand extends RawCategory {
  icon: string | null;
  deviceName?: string | null;
  device_name?: string | null;
}

interface RawColor extends StatusFlag {
  id: number;
  name: string;
  hex: string;
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
}

interface RawDevice extends RawCategory {
  icon: string | null;
}

const normalizeStatus = (raw: StatusFlag) => Boolean(raw.isActive ?? raw.is_active);

const normalizeCategory = (raw: RawCategory): AdminCategory => ({
  id: raw.id,
  name: raw.name,
  slug: raw.slug,
  is_active: normalizeStatus(raw),
  created_at: raw.created_at ?? raw.createdAt ?? "",
  updated_at: raw.updated_at ?? raw.updatedAt ?? "",
});

const normalizeBrand = (raw: RawBrand): AdminBrand => ({
  id: raw.id,
  name: raw.name,
  slug: raw.slug,
  icon: raw.icon,
  device_name: raw.device_name ?? raw.deviceName ?? null,
  is_active: normalizeStatus(raw),
  created_at: raw.created_at ?? raw.createdAt ?? "",
  updated_at: raw.updated_at ?? raw.updatedAt ?? "",
});

const normalizeColor = (raw: RawColor): AdminColor => ({
  id: raw.id,
  name: raw.name,
  hex: raw.hex,
  is_active: normalizeStatus(raw),
  created_at: raw.created_at ?? raw.createdAt ?? "",
  updated_at: raw.updated_at ?? raw.updatedAt ?? "",
});

const normalizeDevice = (raw: RawDevice): AdminDevice => ({
  id: raw.id,
  name: raw.name,
  slug: raw.slug,
  icon: raw.icon,
  is_active: normalizeStatus(raw),
  created_at: raw.created_at ?? raw.createdAt ?? "",
  updated_at: raw.updated_at ?? raw.updatedAt ?? "",
});

// Categories
export const getCategories = async () => {
  const response = await api.get<ApiResponse<RawCategory[]>>("/categories?includeInactive=1");
  return { ...response.data, data: (response.data.data ?? []).map(normalizeCategory) };
};

export const createCategory = async (data: { name: string; slug?: string; isActive: boolean }) => {
  const response = await api.post<ApiResponse<AdminCategory>>("/categories", data);
  return response.data;
};

export const updateCategory = async (
  id: number,
  data: { name?: string; slug?: string; isActive?: boolean }
) => {
  const response = await api.put<ApiResponse<AdminCategory>>(`/categories/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id: number) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};

// Brands
export const getBrands = async () => {
  const response = await api.get<ApiResponse<RawBrand[]>>("/brands?includeInactive=1");
  return { ...response.data, data: (response.data.data ?? []).map(normalizeBrand) };
};

export const createBrand = async (data: FormData) => {
  const response = await api.post<ApiResponse<AdminBrand>>("/brands", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateBrand = async (id: number, data: FormData) => {
  data.append("_method", "PUT");
  const response = await api.post<ApiResponse<AdminBrand>>(`/brands/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteBrand = async (id: number) => {
  const response = await api.delete(`/brands/${id}`);
  return response.data;
};

// Colors
export const getColors = async () => {
  const response = await api.get<ApiResponse<RawColor[]>>("/colors?includeInactive=1");
  return { ...response.data, data: (response.data.data ?? []).map(normalizeColor) };
};

export const createColor = async (data: { name: string; hex: string; isActive: boolean }) => {
  const response = await api.post<ApiResponse<AdminColor>>("/colors", data);
  return response.data;
};

export const updateColor = async (
  id: number,
  data: { name?: string; hex?: string; isActive?: boolean }
) => {
  const response = await api.put<ApiResponse<AdminColor>>(`/colors/${id}`, data);
  return response.data;
};

export const deleteColor = async (id: number) => {
  const response = await api.delete(`/colors/${id}`);
  return response.data;
};

// Devices
export const getDevices = async () => {
  const response = await api.get<ApiResponse<RawDevice[]>>("/devices?includeInactive=1");
  return { ...response.data, data: (response.data.data ?? []).map(normalizeDevice) };
};

export const createDevice = async (data: FormData) => {
  const response = await api.post<ApiResponse<AdminDevice>>("/devices", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateDevice = async (id: number, data: FormData) => {
  data.append("_method", "PUT");
  const response = await api.post<ApiResponse<AdminDevice>>(`/devices/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteDevice = async (id: number) => {
  const response = await api.delete(`/devices/${id}`);
  return response.data;
};
