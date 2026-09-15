import { colorsApi } from "@/features/colors/api/admin-colors.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useColors = () => {
  return useQuery({
    queryKey: ["adminColors"],
    queryFn: colorsApi.getColors,
  });
};

export const useCreateColor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: colorsApi.createColor,
    onSuccess: () => {
      toast.success("Color created");
      queryClient.invalidateQueries({ queryKey: ["adminColors"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to create color");
    },
  });
};

export const useUpdateColor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: colorsApi.updateColor,
    onSuccess: () => {
      toast.success("Color updated");
      queryClient.invalidateQueries({ queryKey: ["adminColors"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to update color");
    },
  });
};

export const useDeleteColor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: colorsApi.deleteColor,
    onSuccess: () => {
      toast.success("Color deleted");
      queryClient.invalidateQueries({ queryKey: ["adminColors"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to delete color");
    },
  });
};
