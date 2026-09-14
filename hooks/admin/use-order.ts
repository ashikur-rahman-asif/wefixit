import { ordersApi } from "@/api/admin/orders.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAdminOrder = (reference: string) => {
  return useQuery({
    queryKey: ["adminOrder", reference],
    queryFn: () => ordersApi.getOrder(reference),
    retry: 1,
  });
};

export const useUpdateOrder = (reference: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { status?: string; paymentStatus?: string; note?: string }) =>
      ordersApi.updateOrder({ reference, data }),
    onSuccess: () => {
      toast.success("Order updated successfully");
      queryClient.invalidateQueries({ queryKey: ["adminOrder", reference] });
      queryClient.invalidateQueries({ queryKey: ["adminOrders"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error?.response?.data?.message || "Failed to update order");
    },
  });
};

export const useDeleteOrder = (reference: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => ordersApi.deleteOrder(reference),
    onSuccess: () => {
      toast.success("Order deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["adminOrders"] });
      router.push("/admin/orders");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error?.response?.data?.message || "Failed to delete order");
    },
  });
};
