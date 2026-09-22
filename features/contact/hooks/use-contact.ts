import { useMutation } from "@tanstack/react-query";
import { submitContactMessage, ContactFormPayload } from "../api/public-contact.api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useSubmitContact = () => {
  return useMutation({
    mutationFn: (data: ContactFormPayload) => submitContactMessage(data),
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Failed to send message. Please try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    },
  });
};
