import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CheckoutInput } from "@/validators/checkout";

interface CheckoutState {
  formData: Partial<CheckoutInput>;
  updateFormData: (data: Partial<CheckoutInput>) => void;
  resetCheckout: () => void;
}

const initialState = {
  formData: {
    paymentMethod: "stripe" as const,
  },
};

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      ...initialState,
      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      resetCheckout: () => set(initialState),
    }),
    {
      name: "checkout-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
