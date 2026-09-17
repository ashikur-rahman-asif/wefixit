import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { productDevicesApi } from "../api/admin-product-devices.api";

interface UseDevicesProps {
  page?: number;
  search?: string;
}

export const useProductDevices = (params?: UseDevicesProps) => {
  return useQuery({
    queryKey: ["adminProductDevices", params?.page, params?.search],
    queryFn: () => productDevicesApi.getDevices(params),
    staleTime: 1000 * 60 * 5,
  });
};

export const useAllProductDevices = () => {
  return useQuery({
    queryKey: ["adminAllProductDevices"],
    queryFn: productDevicesApi.getAllDevices,
    staleTime: 1000 * 60 * 30, 
  });
};

export const useCreateProductDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productDevicesApi.createDevice,
    onSuccess: () => {
      toast.success("Device created");
      queryClient.invalidateQueries({ queryKey: ["adminProductDevices"] });
      queryClient.invalidateQueries({ queryKey: ["adminAllProductDevices"] });
    },
    onError: (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
      const errs = error.response?.data?.errors;
      if (errs && Object.keys(errs).length > 0) {
        toast.error(Object.values(errs)[0][0]);
      } else {
        toast.error(error.response?.data?.message || "Failed to create device");
      }
    },
  });
};

export const useUpdateProductDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productDevicesApi.updateDevice,
    onSuccess: () => {
      toast.success("Device updated");
      queryClient.invalidateQueries({ queryKey: ["adminProductDevices"] });
      queryClient.invalidateQueries({ queryKey: ["adminAllProductDevices"] });
    },
    onError: (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
      const errs = error.response?.data?.errors;
      if (errs && Object.keys(errs).length > 0) {
        toast.error(Object.values(errs)[0][0]);
      } else {
        toast.error(error.response?.data?.message || "Failed to update device");
      }
    },
  });
};

export const useDeleteProductDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productDevicesApi.deleteDevice,
    onSuccess: () => {
      toast.success("Device deleted");
      queryClient.invalidateQueries({ queryKey: ["adminProductDevices"] });
      queryClient.invalidateQueries({ queryKey: ["adminAllProductDevices"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to delete device");
    },
  });
};
