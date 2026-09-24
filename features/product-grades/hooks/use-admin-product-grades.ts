import { productGradesApi } from "@/features/product-grades/api/admin-product-grades.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

type GradeFormData = {
  name: string;
  description?: string;
  isActive: boolean;
};

export const useProductGrades = () => {
  return useQuery({
    queryKey: ["adminProductGrades"],
    queryFn: productGradesApi.getProductGrades,
  });
};

export const useCreateProductGrade = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GradeFormData) => productGradesApi.createProductGrade(data),
    onSuccess: () => {
      toast.success("Product grade created");
      queryClient.invalidateQueries({ queryKey: ["adminProductGrades"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to create grade");
    },
  });
};

export const useUpdateProductGrade = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: GradeFormData }) =>
      productGradesApi.updateProductGrade({ id, data }),
    onSuccess: () => {
      toast.success("Product grade updated");
      queryClient.invalidateQueries({ queryKey: ["adminProductGrades"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to update grade");
    },
  });
};

export const useDeleteProductGrade = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => productGradesApi.deleteProductGrade(id),
    onSuccess: () => {
      toast.success("Product grade deleted");
      queryClient.invalidateQueries({ queryKey: ["adminProductGrades"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to delete grade");
    },
  });
};
