import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { repairsApi } from "@/features/repairs/api/admin-repairs.api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const useAdminRepair = (reference: string) => {
  return useQuery({
    queryKey: ["adminRepair", reference],
    queryFn: () => repairsApi.getRepair(reference),
    enabled: !!reference,
  });
};

export const useUpdateRepair = (reference: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      status?: string;
      diagnosisNotes?: string;
      partsCost?: number;
      serviceCharge?: number;
    }) => repairsApi.updateRepair(reference, data),
    onSuccess: () => {
      toast.success("Repair updated successfully");
      queryClient.invalidateQueries({ queryKey: ["adminRepair", reference] });
      queryClient.invalidateQueries({ queryKey: ["adminRepairs"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error?.response?.data?.message || "Failed to update repair");
    },
  });
};

export const useDeleteRepair = (reference: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => repairsApi.deleteRepair(reference),
    onSuccess: () => {
      toast.success("Repair deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["adminRepairs"] });
      router.push("/admin/repair-orders");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error?.response?.data?.message || "Failed to delete repair");
    },
  });
};

export const useDeleteRepairEvent = (reference: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: number) => repairsApi.deleteEvent(reference, eventId),
    onSuccess: () => {
      toast.success("Timeline event removed");
      queryClient.invalidateQueries({ queryKey: ["adminRepair", reference] });
      queryClient.invalidateQueries({ queryKey: ["adminRepairs"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error?.response?.data?.message || "Failed to remove timeline event");
    },
  });
};
