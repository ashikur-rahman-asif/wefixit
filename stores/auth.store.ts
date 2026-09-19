import { User } from "@/features/auth/types/auth.types";
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
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        Cookies.set("token", token, { expires: 7, path: "/" });
        const role = user.roles?.includes("admin") ? "admin" : "user";
        Cookies.set("user_role", role, { expires: 7, path: "/" });
        set({ user, token, isAuthenticated: true });
      },
      clearAuth: () => {
        Cookies.remove("token", { path: "/" });
        Cookies.remove("token");
        Cookies.remove("user_role", { path: "/" });
        Cookies.remove("user_role");
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
