import { useQuery } from "@tanstack/react-query";
import { customerRepairsApi } from "../api/customer-repairs.api";

export const useCustomerRepairs = (params?: { page?: number; perPage?: number }) => {
  return useQuery({
    queryKey: ["customerRepairs", params],
    queryFn: () => customerRepairsApi.getRepairs(params),
  });
};

export const useCustomerRepair = (reference: string) => {
  return useQuery({
    queryKey: ["customerRepair", reference],
    queryFn: () => customerRepairsApi.getRepair(reference),
    enabled: !!reference,
  });
};
