import { create } from "zustand";

type Step = 1 | 2 | 3;

interface ForgotPasswordState {
  step: Step;
  email: string;
  resetToken: string;
  setStep: (step: Step) => void;
  setEmail: (email: string) => void;
  setResetToken: (token: string) => void;
  clearState: () => void;
}

export const useForgotPasswordStore = create<ForgotPasswordState>((set) => ({
  step: 1,
  email: "",
  resetToken: "",
  setStep: (step) => set({ step }),
  setEmail: (email) => set({ email }),
  setResetToken: (resetToken) => set({ resetToken }),
  clearState: () => set({ step: 1, email: "", resetToken: "" }),
}));
