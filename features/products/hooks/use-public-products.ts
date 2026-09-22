import { useQuery } from "@tanstack/react-query";
import { publicProductsApi } from "../api/public-products.api";

interface UsePublicProductsParams {
  page?: number;
  perPage?: number;
  category?: string;
  brand?: string;
  device?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export const usePublicProducts = (params?: UsePublicProductsParams) => {
  return useQuery({
    queryKey: ["public-products", params],
    queryFn: () => publicProductsApi.getProducts(params),
    staleTime: 1000 * 60 * 3,
  });
};

export const usePublicProductDetails = (slug: string) => {
  return useQuery({
    queryKey: ["public-product", slug],
    queryFn: () => publicProductsApi.getProductBySlug(slug),
    staleTime: 1000 * 60 * 3,
    enabled: !!slug,
  });
};
