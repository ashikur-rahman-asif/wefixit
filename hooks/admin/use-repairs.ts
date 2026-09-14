import { useQuery } from "@tanstack/react-query";
import { repairsApi } from "@/api/admin/repairs.api";

export const useRepairs = (params?: {
  page?: number;
  perPage?: number;
  status?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["adminRepairs", params],
    queryFn: () => repairsApi.getRepairs(params),
    placeholderData: (prev) => prev,
  });
};
