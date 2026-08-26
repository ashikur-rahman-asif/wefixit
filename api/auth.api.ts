import api from "@/lib/axios";
import {
  AuthResponse,
  BasicResponse,
  RegisterPayload,
  VerifyOtpPayload,
} from "@/types/auth";

export const authApi = {
  register: async (data: RegisterPayload) => {
    const response = await api.post<AuthResponse>("/register", data);
    return response.data;
  },

  verifyRegistrationOtp: async (data: VerifyOtpPayload) => {
    const response = await api.post<BasicResponse>(
      "/verify-registration-otp",
      data,
    );
    return response.data;
  },

  resendRegistrationOtp: async (email: string) => {
    const response = await api.post<BasicResponse>(
      "/resend-registration-otp",
      { email },
    );
    return response.data;
  },
};
