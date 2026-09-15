import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface RepairState {
  selectedDevice: string | null;
  selectedBrand: string | null;
  selectedIssue: string | null;
  issueDescription: string;
  modelName: string;
  handoverMethod: string | null;
  selectedDate: string | null;
  selectedTime: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  additionalComments: string;
  
  updateField: <K extends keyof Omit<RepairState, "updateField" | "reset">>(
    key: K,
    value: RepairState[K]
  ) => void;
  reset: () => void;
}

const initialState = {
  selectedDevice: null,
  selectedBrand: null,
  selectedIssue: null,
  issueDescription: "",
  modelName: "",
  handoverMethod: null,
  selectedDate: null,
  selectedTime: null,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  additionalComments: "",
};

export const useRepairStore = create<RepairState>()(
  persist(
    (set) => ({
      ...initialState,
      updateField: (key, value) => set({ [key]: value }),
      reset: () => set(initialState),
    }),
    {
      name: "repair-wizard-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
