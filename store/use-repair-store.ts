import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface RepairState {
  selectedDevice: string | null;
  setSelectedDevice: (device: string) => void;
  selectedBrand: string | null;
  setSelectedBrand: (brand: string) => void;
  selectedIssue: string | null;
  setSelectedIssue: (issue: string) => void;
  issueDescription: string;
  setIssueDescription: (description: string) => void;
  modelName: string;
  setModelName: (model: string) => void;
  handoverMethod: string | null;
  setHandoverMethod: (method: string) => void;
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
}

export const useRepairStore = create<RepairState>()(
  persist(
    (set) => ({
      selectedDevice: null,
      setSelectedDevice: (device) => set({ selectedDevice: device }),
      selectedBrand: null,
      setSelectedBrand: (brand) => set({ selectedBrand: brand }),
      selectedIssue: null,
      setSelectedIssue: (issue) => set({ selectedIssue: issue }),
      issueDescription: "",
      setIssueDescription: (description) => set({ issueDescription: description }),
      modelName: "",
      setModelName: (model) => set({ modelName: model }),
      handoverMethod: null,
      setHandoverMethod: (method) => set({ handoverMethod: method }),
      selectedDate: null,
      setSelectedDate: (date) => set({ selectedDate: date }),
      selectedTime: null,
      setSelectedTime: (time) => set({ selectedTime: time }),
    }),
    {
      name: "repair-wizard-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
