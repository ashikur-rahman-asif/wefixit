import { devicesApi } from "@/features/devices/api/admin-devices.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useDevices = () => {
  return useQuery({
    queryKey: ["adminDevices"],
    queryFn: devicesApi.getDevices,
    staleTime: 1000 * 60 * 20,
  });
};

export const useCreateDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: devicesApi.createDevice,
    onSuccess: () => {
      toast.success("Device created");
      queryClient.invalidateQueries({ queryKey: ["adminDevices"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to create device");
    },
  });
};

export const useUpdateDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: devicesApi.updateDevice,
    onSuccess: () => {
      toast.success("Device updated");
      queryClient.invalidateQueries({ queryKey: ["adminDevices"] });
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

export const useDeleteDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: devicesApi.deleteDevice,
    onSuccess: () => {
      toast.success("Device deleted");
      queryClient.invalidateQueries({ queryKey: ["adminDevices"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to delete device");
    },
  });
};
