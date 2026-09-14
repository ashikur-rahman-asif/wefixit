import { ordersApi } from "@/api/admin/orders.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useAdminOrders = (queryParams: Record<string, string | number>) => {
  return useQuery({
    queryKey: ["adminOrders", queryParams],
    queryFn: () => ordersApi.getOrders(queryParams),
  });
};

export const useDeleteOrderList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reference: string) => ordersApi.deleteOrder(reference),
    onSuccess: () => {
      toast.success("Order deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["adminOrders"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error?.response?.data?.message || "Failed to delete order");
    },
  });
};

export const useOrdersFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");
  const perPage = parseInt(searchParams.get("perPage") || "15");
  const status = searchParams.get("status") || "all";
  const paymentStatus = searchParams.get("paymentStatus") || "all";

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  const queryParams: Record<string, string | number> = { page, perPage };
  if (status !== "all") queryParams.status = status;
  if (paymentStatus !== "all") queryParams.paymentStatus = paymentStatus;
  if (searchParams.get("search")) queryParams.search = searchParams.get("search")!;

  const handleFilterChange = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== "page") params.set("page", "1");
    router.push(`/admin/orders?${params.toString()}`);
  };

  return {
    page,
    perPage,
    status,
    paymentStatus,
    searchQuery,
    setSearchQuery,
    queryParams,
    handleFilterChange,
  };
};
