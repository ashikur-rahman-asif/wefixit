import { useQuery } from "@tanstack/react-query";
import { customerOrdersApi } from "../api/customer-orders.api";

export const useCustomerOrders = (params?: { page?: number; perPage?: number }) => {
  return useQuery({
    queryKey: ["customerOrders", params],
    queryFn: () => customerOrdersApi.getOrders(params),
  });
};

export const useCustomerOrder = (reference: string) => {
  return useQuery({
    queryKey: ["customerOrder", reference],
    queryFn: () => customerOrdersApi.getOrder(reference),
    enabled: !!reference,
  });
};
