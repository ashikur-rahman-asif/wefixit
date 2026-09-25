import api from "@/lib/axios";
import { AdminContactMessage, PaginatedResponse, ApiResponse } from "@/types/admin";

export const getContactMessages = async (params?: {
  page?: number;
  status?: string;
  search?: string;
}) => {
  const response = await api.get<PaginatedResponse<AdminContactMessage>>("/contact-messages", {
    params,
  });
  return response.data;
};

export const updateContactMessage = async (
  id: number,
  data: { status?: string; admin_notes?: string },
) => {
  const response = await api.put<ApiResponse<AdminContactMessage>>(`/contact-messages/${id}`, data);
  return response.data;
};

export const deleteContactMessage = async (id: number) => {
  const response = await api.delete<ApiResponse<null>>(`/contact-messages/${id}`);
  return response.data;
};
