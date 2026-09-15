import { brandsApi } from "@/features/brands/api/admin-brands.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useBrands = () => {
  return useQuery({
    queryKey: ["adminBrands"],
    queryFn: brandsApi.getBrands,
  });
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: brandsApi.createBrand,
    onSuccess: () => {
      toast.success("Brand created");
      queryClient.invalidateQueries({ queryKey: ["adminBrands"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to create brand");
    },
  });
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: brandsApi.updateBrand,
    onSuccess: () => {
      toast.success("Brand updated");
      queryClient.invalidateQueries({ queryKey: ["adminBrands"] });
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

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: brandsApi.deleteBrand,
    onSuccess: () => {
      toast.success("Brand deleted");
      queryClient.invalidateQueries({ queryKey: ["adminBrands"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to delete brand");
    },
  });
};
