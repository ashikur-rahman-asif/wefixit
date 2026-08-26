import api from "@/lib/axios";
import { LoginInput } from "@/validators/user";
import {
  AuthResponse,
  BasicResponse,
  RegisterPayload,
  VerifyOtpPayload,
  ResetPasswordPayload,
} from "@/types/auth";
import { ForgotPasswordInput } from "@/validators/user";

export const authApi = {
  login: async (data: LoginInput) => {
    const response = await api.post<AuthResponse>("/login", data);
    return response.data;
  },

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

  forgotPassword: async (data: ForgotPasswordInput) => {
    const response = await api.post<BasicResponse>("/forgot-password", data);
    return response.data;
  },

  verifyResetOtp: async (data: VerifyOtpPayload) => {
    const response = await api.post<{
      status: string;
      message: string;
      data: { reset_token: string; expires_in: number };
    }>("/verify-reset-otp", data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordPayload) => {
    const response = await api.post<BasicResponse>("/reset-password", data);
    return response.data;
  },
};
