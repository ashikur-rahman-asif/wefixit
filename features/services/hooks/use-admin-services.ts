import { servicesApi } from "@/features/services/api/admin-services.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useServices = () => {
  return useQuery({
    queryKey: ["adminServices"],
    queryFn: servicesApi.getServices,
    staleTime: 1000 * 60 * 20,
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: servicesApi.createService,
    onSuccess: () => {
      toast.success("Service created");
      queryClient.invalidateQueries({ queryKey: ["adminServices"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to create service");
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: servicesApi.updateService,
    onSuccess: () => {
      toast.success("Service updated");
      queryClient.invalidateQueries({ queryKey: ["adminServices"] });
    },
    onError: (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
      const errs = error.response?.data?.errors;
      if (errs && Object.keys(errs).length > 0) {
        toast.error(Object.values(errs)[0][0]);
      } else {
        toast.error(error.response?.data?.message || "Failed to update service");
      }
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: servicesApi.deleteService,
    onSuccess: () => {
      toast.success("Service deleted");
      queryClient.invalidateQueries({ queryKey: ["adminServices"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to delete service");
    },
  });
};
