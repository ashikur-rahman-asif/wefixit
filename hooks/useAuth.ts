import { authApi } from "@/api/auth.api";
import { RegisterPayload, VerifyOtpPayload, ResetPasswordPayload } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { LoginInput, ForgotPasswordInput } from "@/validators/user";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterPayload) => authApi.register(data),
  });
};

export const useVerifyRegistrationOtp = () => {
  return useMutation({
    mutationFn: (data: VerifyOtpPayload) => authApi.verifyRegistrationOtp(data),
  });
};

export const useResendRegistrationOtp = () => {
  return useMutation({
    mutationFn: (email: string) => authApi.resendRegistrationOtp(email),
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordInput) => authApi.forgotPassword(data),
  });
};

export const useVerifyResetOtp = () => {
  return useMutation({
    mutationFn: (data: VerifyOtpPayload) => authApi.verifyResetOtp(data),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordPayload) => authApi.resetPassword(data),
  });
};
