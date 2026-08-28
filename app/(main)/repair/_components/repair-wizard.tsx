"use client";

import { useRepairStore } from "@/store/use-repair-store";
import type { Device } from "@/types/repair";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DeviceSelector } from "./device-selector";
import { NavigationButtons } from "./navigation-buttons";
import { Stepper } from "./stepper";

const STEPS = [
  "Device",
  "Brands",
  "Model",
  "Service Info",
  "Payment",
  "Confirmation",
];

const DEMO_DEVICES: Device[] = [
  { id: 1, name: "Iphone", icon: "/repair/iphone.png" },
  { id: 2, name: "Android", icon: "/repair/android.png" },
  { id: 3, name: "Tablet", icon: "/repair/tablet.png" },
  { id: 4, name: "Ipad", icon: "/repair/ipad.png" },
  { id: 5, name: "Laptop", icon: "/repair/laptop.png" },
  { id: 6, name: "Watch", icon: "/repair/watch.png" },
];

export function RepairWizard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedDevice = useRepairStore((state) => state.selectedDevice);
  const setSelectedDevice = useRepairStore((state) => state.setSelectedDevice);

  const currentStepParam = searchParams.get("step");
  const currentStep = STEPS.includes(currentStepParam as string)
    ? currentStepParam!
    : "Device";

  const currentIndex = STEPS.indexOf(currentStep);

  const setStepInUrl = (stepName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", stepName);

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleNext = () => {
    if (currentIndex < STEPS.length - 1) {
      setStepInUrl(STEPS[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setStepInUrl(STEPS[currentIndex - 1]);
    }
  };

  return (
    <>
      <Stepper steps={STEPS} currentStep={currentStep} />
      {currentStep === "Device" ? (
        <DeviceSelector
          devices={DEMO_DEVICES}
          selectedDevice={selectedDevice}
          onSelect={setSelectedDevice}
        />
      ) : (
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold text-primary">
            Under Construction
          </h2>
        </div>
      )}

      <NavigationButtons
        currentIndex={currentIndex}
        totalSteps={STEPS.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </>
  );
}
