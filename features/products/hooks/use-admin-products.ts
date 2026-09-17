import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { productsApi } from "../api/admin-products.api";

interface UseProductsProps {
  page?: number;
  search?: string;
  perPage?: number;
  category?: string;
  brand?: string;
  device?: string;
  status?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const useAdminProducts = (params?: UseProductsProps) => {
  return useQuery({
    queryKey: ["adminProducts", params],
    queryFn: () => productsApi.getProducts(params),
    staleTime: 1000 * 60 * 5,
  });
};

export const useAdminProduct = (id: number | string) => {
  return useQuery({
    queryKey: ["adminProduct", id],
    queryFn: () => productsApi.getProduct(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id && id !== "new",
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsApi.createProduct,
    onSuccess: () => {
      toast.success("Product created");
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
    },
    onError: (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
      const errs = error.response?.data?.errors;
      if (errs && Object.keys(errs).length > 0) {
        toast.error(Object.values(errs)[0][0]);
      } else {
        toast.error(error.response?.data?.message || "Failed to create product");
      }
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsApi.updateProduct,
    onSuccess: () => {
      toast.success("Product updated");
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
      queryClient.invalidateQueries({ queryKey: ["adminProduct"] });
    },
    onError: (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
      const errs = error.response?.data?.errors;
      if (errs && Object.keys(errs).length > 0) {
        toast.error(Object.values(errs)[0][0]);
      } else {
        toast.error(error.response?.data?.message || "Failed to update product");
      }
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsApi.deleteProduct,
    onSuccess: () => {
      toast.success("Product deleted");
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to delete product");
    },
  });
};
