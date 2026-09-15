import { adminUsersApi } from "@/features/users/api/admin-users.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { AdminUser, PaginatedResponse, ApiResponse } from "@/types/admin";

export const useAdminUsers = (queryParams: Record<string, string | number>) => {
  return useQuery({
    queryKey: ["adminUsers", queryParams],
    queryFn: () => adminUsersApi.getUsers(queryParams),
  });
};

export const useUpdateUserRoles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, roles }: { id: number; roles: string[] }) =>
      adminUsersApi.updateUserRoles(id, roles),
    onSuccess: (data) => {
      toast.success(data.message || "User roles updated successfully");
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error?.response?.data?.message || "Failed to update user roles");
    },
  });
};

export const useUsersFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");
  const perPage = parseInt(searchParams.get("perPage") || "15");
  const role = searchParams.get("role") || "all";

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  const queryParams: Record<string, string | number> = { page, perPage };
  if (role !== "all") queryParams.role = role;
  if (searchParams.get("search")) queryParams.search = searchParams.get("search")!;

  const handleFilterChange = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== "page") params.set("page", "1");
    router.push(`/admin/users?${params.toString()}`);
  };

  return {
    page,
    perPage,
    role,
    searchQuery,
    setSearchQuery,
    queryParams,
    handleFilterChange,
  };
};
