import { User } from "@/features/auth/types/auth.types";
import Cookies from "js-cookie";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setAuth: (user) => {
        const role = user.roles?.includes("admin") ? "admin" : "user";
        Cookies.set("user_role", role, { expires: 7, path: "/" });
        set({ user, isAuthenticated: true });
      },
      clearAuth: () => {
        Cookies.remove("user_role", { path: "/" });
        Cookies.remove("token", { path: "/" });
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
