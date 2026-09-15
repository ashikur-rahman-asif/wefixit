import { publicRepairsApi, SubmitRepairPayload } from "@/features/repairs/api/public-repairs.api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useSubmitRepair = () => {
  return useMutation({
    mutationFn: (data: SubmitRepairPayload) => publicRepairsApi.submitRepair(data),
    onSuccess: () => {
      toast.success("Repair request submitted successfully!");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to submit repair request.");
    },
  });
};
