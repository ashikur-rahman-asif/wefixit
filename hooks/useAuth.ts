import { authApi } from "@/api/auth.api";
import { RegisterPayload, VerifyOtpPayload } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

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
