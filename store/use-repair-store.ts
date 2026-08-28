import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface RepairState {
  selectedDevice: string | null;
  setSelectedDevice: (device: string) => void;
}

export const useRepairStore = create<RepairState>()(
  persist(
    (set) => ({
      selectedDevice: "Iphone",
      setSelectedDevice: (device) => set({ selectedDevice: device }),
    }),
    {
      name: "repair-wizard-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
