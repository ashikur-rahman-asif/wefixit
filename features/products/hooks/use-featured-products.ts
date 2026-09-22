import { useQuery } from "@tanstack/react-query";
import { publicProductsApi } from "../api/public-products.api";

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ["featured-products"],
    queryFn: () => publicProductsApi.getFeaturedProducts(),
    staleTime: 1000 * 60 * 3,
  });
};
