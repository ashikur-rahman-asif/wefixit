import api from "@/lib/axios";

export interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const submitContactMessage = async (data: ContactFormPayload) => {
  const response = await api.post("/contact-messages", data);
  return response.data;
};
