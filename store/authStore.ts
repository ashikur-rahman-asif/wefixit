import { User } from "@/types/auth";
import Cookies from "js-cookie";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // --- PRODUCTION STATE ---
      // user: null,
      // token: null,
      // isAuthenticated: false,

      // --- DEV MOCK STATE ---
      user: {
        id: 1,
        first_name: "Ashikur",
        last_name: "Asif",
        name: "Ashikur Asif",
        email: "asif@gmail.com",
        phone: "01518904721",
        email_verified_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as User,
      token: "dev-token-123",
      isAuthenticated: true,
      setAuth: (user, token) => {
        Cookies.set("token", token, { expires: 7, path: "/" });
        set({ user, token, isAuthenticated: true });
      },
      clearAuth: () => {
        Cookies.remove("token", { path: "/" });
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      // name: "auth-storage",
      name: "auth-storage-dev",
    },
  ),
);
