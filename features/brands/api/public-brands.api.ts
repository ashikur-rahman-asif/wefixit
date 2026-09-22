import api from "@/lib/axios";
import { ApiResponse } from "@/types/admin";

type RawBrand = {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  deviceIds?: number[];
  device_ids?: number[];
};

export const publicBrandsApi = {
  getBrands: async () => {
    const response = await api.get<ApiResponse<RawBrand[]>>("/brands");
    return {
      ...response.data,
      data: (response.data.data ?? []).map((brand) => ({
        id: brand.id,
        name: brand.name,
        slug: brand.slug,
        icon: brand.icon || undefined,
        deviceName: "",
        deviceIds: (brand.deviceIds ?? brand.device_ids ?? []).map(Number),
      })),
    };
  },
};
