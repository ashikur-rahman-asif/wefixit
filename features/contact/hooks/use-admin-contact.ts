import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import {
  getContactMessages,
  updateContactMessage,
  deleteContactMessage,
} from "../api/admin-contact.api";

export const useAdminContactMessages = (params?: {
  page?: number;
  status?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["admin-contact-messages", params],
    queryFn: () => getContactMessages(params),
  });
};

export const useUpdateContactMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: { status?: string; admin_notes?: string } }) =>
      updateContactMessage(id, data),
    onSuccess: () => {
      toast.success("Contact message updated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-contact-messages"] });
      queryClient.invalidateQueries({ queryKey: ["adminDashboardStats"] });
    },
    onError: (error: AxiosError | Error) => {
      let errorMessage = "Failed to update contact message";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      toast.error(errorMessage);
    },
  });
};

export const useDeleteContactMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteContactMessage(id),
    onSuccess: () => {
      toast.success("Contact message deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-contact-messages"] });
      queryClient.invalidateQueries({ queryKey: ["adminDashboardStats"] });
    },
    onError: (error: AxiosError | Error) => {
      let errorMessage = "Failed to delete contact message";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      toast.error(errorMessage);
    },
  });
};
