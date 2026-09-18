import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { productCategoriesApi } from "../api/admin-product-categories.api";

interface UseCategoriesProps {
  page?: number;
  search?: string;
  per_page?: number;
}

export const useProductCategories = (params?: UseCategoriesProps) => {
  return useQuery({
    queryKey: ["adminProductCategories", params?.page, params?.search, params?.per_page],
    queryFn: () => productCategoriesApi.getCategories(params),
    staleTime: 1000 * 60 * 5,
  });
};

export const useAllProductCategories = () => {
  return useQuery({
    queryKey: ["adminAllProductCategories"],
    queryFn: productCategoriesApi.getAllCategories,
    staleTime: 1000 * 60 * 30, 
  });
};

export const useCreateProductCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productCategoriesApi.createCategory,
    onSuccess: () => {
      toast.success("Category created");
      queryClient.invalidateQueries({ queryKey: ["adminProductCategories"] });
      queryClient.invalidateQueries({ queryKey: ["adminAllProductCategories"] });
    },
    onError: (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
      const errs = error.response?.data?.errors;
      if (errs && Object.keys(errs).length > 0) {
        toast.error(Object.values(errs)[0][0]);
      } else {
        toast.error(error.response?.data?.message || "Failed to create category");
      }
    },
  });
};

export const useUpdateProductCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productCategoriesApi.updateCategory,
    onSuccess: () => {
      toast.success("Category updated");
      queryClient.invalidateQueries({ queryKey: ["adminProductCategories"] });
      queryClient.invalidateQueries({ queryKey: ["adminAllProductCategories"] });
    },
    onError: (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
      const errs = error.response?.data?.errors;
      if (errs && Object.keys(errs).length > 0) {
        toast.error(Object.values(errs)[0][0]);
      } else {
        toast.error(error.response?.data?.message || "Failed to update category");
      }
    },
  });
};

export const useDeleteProductCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productCategoriesApi.deleteCategory,
    onSuccess: () => {
      toast.success("Category deleted");
      queryClient.invalidateQueries({ queryKey: ["adminProductCategories"] });
      queryClient.invalidateQueries({ queryKey: ["adminAllProductCategories"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to delete category");
    },
  });
};
