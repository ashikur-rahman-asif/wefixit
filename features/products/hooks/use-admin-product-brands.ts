import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { productBrandsApi } from "../api/admin-product-brands.api";

interface UseBrandsProps {
  page?: number;
  search?: string;
  per_page?: number;
}

export const useProductBrands = (params?: UseBrandsProps) => {
  return useQuery({
    queryKey: ["adminProductBrands", params?.page, params?.search, params?.per_page],
    queryFn: () => productBrandsApi.getBrands(params),
    staleTime: 1000 * 60 * 5,
  });
};

export const useAllProductBrands = () => {
  return useQuery({
    queryKey: ["adminAllProductBrands"],
    queryFn: productBrandsApi.getAllBrands,
    staleTime: 1000 * 60 * 30, 
  });
};

export const useCreateProductBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productBrandsApi.createBrand,
    onSuccess: () => {
      toast.success("Brand created");
      queryClient.invalidateQueries({ queryKey: ["adminProductBrands"] });
      queryClient.invalidateQueries({ queryKey: ["adminAllProductBrands"] });
    },
    onError: (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
      const errs = error.response?.data?.errors;
      if (errs && Object.keys(errs).length > 0) {
        toast.error(Object.values(errs)[0][0]);
      } else {
        toast.error(error.response?.data?.message || "Failed to create brand");
      }
    },
  });
};

export const useUpdateProductBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productBrandsApi.updateBrand,
    onSuccess: () => {
      toast.success("Brand updated");
      queryClient.invalidateQueries({ queryKey: ["adminProductBrands"] });
      queryClient.invalidateQueries({ queryKey: ["adminAllProductBrands"] });
    },
    onError: (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
      const errs = error.response?.data?.errors;
      if (errs && Object.keys(errs).length > 0) {
        toast.error(Object.values(errs)[0][0]);
      } else {
        toast.error(error.response?.data?.message || "Failed to update brand");
      }
    },
  });
};

export const useDeleteProductBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productBrandsApi.deleteBrand,
    onSuccess: () => {
      toast.success("Brand deleted");
      queryClient.invalidateQueries({ queryKey: ["adminProductBrands"] });
      queryClient.invalidateQueries({ queryKey: ["adminAllProductBrands"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to delete brand");
    },
  });
};
