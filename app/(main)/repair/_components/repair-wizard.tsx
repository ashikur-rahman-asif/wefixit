"use client";

import type { Device } from "@/types/repair";
import { useState } from "react";
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
  const [selectedDevice, setSelectedDevice] = useState("Iphone");
  const [currentStep, setCurrentStep] = useState("Device");

  const currentIndex = STEPS.indexOf(currentStep);

  const handleNext = () => {
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1]);
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
          <p className="text-muted-foreground mt-2 max-w-md">
            The {currentStep} step is currently being built. You can navigate
            back or proceed to the next steps.
          </p>
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
