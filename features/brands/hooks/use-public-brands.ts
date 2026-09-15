import { publicBrandsApi } from "@/features/brands/api/public-brands.api";
import { useQuery } from "@tanstack/react-query";

export const usePublicBrands = () => {
  return useQuery({
    queryKey: ["publicBrands"],
    queryFn: publicBrandsApi.getBrands,
  });
};
