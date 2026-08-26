export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  name: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface ResetPasswordPayload {
  reset_token: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  status: string;
  message?: string;
  data?: {
    token: string;
    token_type: string;
    expires_in: number;
    user: User;
  };
}

export interface BasicResponse {
  status: string;
  message: string;
}
