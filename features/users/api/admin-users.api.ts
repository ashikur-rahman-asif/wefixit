import api from "@/lib/axios";
import { AdminUser, PaginatedResponse, ApiResponse } from "@/types/admin";

export const adminUsersApi = {
  getUsers: async (
    params?: Record<string, string | number>
  ): Promise<PaginatedResponse<AdminUser>> => {
    const { data } = await api.get<PaginatedResponse<AdminUser>>(
      "/admin/users",
      { params }
    );
    return data;
  },

  getUser: async (id: number): Promise<ApiResponse<AdminUser>> => {
    const { data } = await api.get<ApiResponse<AdminUser>>(`/admin/users/${id}`);
    return data;
  },

  updateUserRoles: async (
    id: number,
    roles: string[]
  ): Promise<ApiResponse<AdminUser>> => {
    const { data } = await api.put<ApiResponse<AdminUser>>(
      `/admin/users/${id}/roles`,
      { roles }
    );
    return data;
  },
};
