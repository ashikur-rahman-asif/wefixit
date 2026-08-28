"use client";

import { useRepairStore } from "@/store/use-repair-store";
import type { Brand, Device } from "@/types/repair";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { DeviceSelector } from "./device-selector";
import { BrandSelector } from "./brand-selector";
import { ServiceInfo } from "./service-info";
import { NavigationButtons } from "./navigation-buttons";
import { Stepper } from "./stepper";
import { Loader } from "@/components/ui/loader";
import { HandoverSelector } from "./handover-selector";

const STEPS = [
  "Device",
  "Brands",
  "Service",
  "Handover",
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

const DEMO_BRANDS: Brand[] = [
  { id: 1, name: "Samsung", icon: "/samsung.png", deviceName: "Android" },
  { id: 2, name: "Xiaomi", icon: "/samsung.png", deviceName: "Android" },
  { id: 3, name: "Redmi", icon: "/samsung.png", deviceName: "Android" },
  { id: 4, name: "Oppo", icon: "/samsung.png", deviceName: "Android" },
  { id: 5, name: "Vivo", icon: "/samsung.png", deviceName: "Android" },
  { id: 6, name: "Realme", icon: "/samsung.png", deviceName: "Android" },
  { id: 7, name: "OnePlus", icon: "/samsung.png", deviceName: "Android" },
  { id: 8, name: "Google Pixel", icon: "/samsung.png", deviceName: "Android" },
  
  { id: 9, name: "Apple", icon: "/samsung.png", deviceName: "Iphone" },
  
  { id: 10, name: "Samsung", icon: "/samsung.png", deviceName: "Tablet" },
  { id: 11, name: "Lenovo", icon: "/samsung.png", deviceName: "Tablet" },
  { id: 12, name: "Amazon", icon: "/samsung.png", deviceName: "Tablet" },
  { id: 13, name: "Xiaomi", icon: "/samsung.png", deviceName: "Tablet" },
  
  { id: 14, name: "Apple", icon: "/samsung.png", deviceName: "Ipad" },
  
  { id: 15, name: "HP", icon: "/samsung.png", deviceName: "Laptop" },
  { id: 16, name: "Dell", icon: "/samsung.png", deviceName: "Laptop" },
  { id: 17, name: "Asus", icon: "/samsung.png", deviceName: "Laptop" },
  { id: 18, name: "Acer", icon: "/samsung.png", deviceName: "Laptop" },
  { id: 19, name: "Lenovo", icon: "/samsung.png", deviceName: "Laptop" },
  { id: 20, name: "Apple", icon: "/samsung.png", deviceName: "Laptop" },
  { id: 21, name: "MSI", icon: "/samsung.png", deviceName: "Laptop" },
  
  { id: 22, name: "Apple", icon: "/samsung.png", deviceName: "Watch" },
  { id: 23, name: "Samsung", icon: "/samsung.png", deviceName: "Watch" },
  { id: 24, name: "Amazfit", icon: "/samsung.png", deviceName: "Watch" },
  { id: 25, name: "Garmin", icon: "/samsung.png", deviceName: "Watch" },
  { id: 26, name: "Fitbit", icon: "/samsung.png", deviceName: "Watch" },
];

export function RepairWizard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [modelError, setModelError] = useState("");
  const [descError, setDescError] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const selectedDevice = useRepairStore((state) => state.selectedDevice);
  const setSelectedDevice = useRepairStore((state) => state.setSelectedDevice);
  const selectedBrand = useRepairStore((state) => state.selectedBrand);
  const setSelectedBrand = useRepairStore((state) => state.setSelectedBrand);
  const selectedIssue = useRepairStore((state) => state.selectedIssue);
  const setSelectedIssue = useRepairStore((state) => state.setSelectedIssue);
  const issueDescription = useRepairStore((state) => state.issueDescription);
  const setIssueDescription = useRepairStore((state) => state.setIssueDescription);
  const modelName = useRepairStore((state) => state.modelName);
  const setModelName = useRepairStore((state) => state.setModelName);
  const handoverMethod = useRepairStore((state) => state.handoverMethod);
  const setHandoverMethod = useRepairStore((state) => state.setHandoverMethod);
  const selectedDate = useRepairStore((state) => state.selectedDate);
  const setSelectedDate = useRepairStore((state) => state.setSelectedDate);
  const selectedTime = useRepairStore((state) => state.selectedTime);
  const setSelectedTime = useRepairStore((state) => state.setSelectedTime);

  const currentBrands = DEMO_BRANDS.filter(
    (brand) => brand.deviceName === (selectedDevice || "Android")
  );

  const currentStepParam = searchParams.get("step");
  const currentStep = STEPS.includes(currentStepParam as string)
    ? currentStepParam!
    : "Device";

  const currentIndex = STEPS.indexOf(currentStep);

  const setStepInUrl = useCallback((stepName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", stepName);

    router.push(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams]);

  useEffect(() => {
    if (!isMounted) return;
    
    if (currentIndex >= 1 && !selectedDevice) {
      setStepInUrl("Device");
    }
    else if (currentIndex >= 2 && !selectedBrand) {
      setStepInUrl("Brands");
    }

  }, [isMounted, currentIndex, selectedDevice, selectedBrand, setStepInUrl]);

  const handleNext = () => {
    if (currentStep === "Service") {
      let hasError = false;
      if (!modelName.trim()) {
        setModelError("Device Model is required.");
        hasError = true;
      } else {
        setModelError("");
      }

      if (!issueDescription.trim()) {
        setDescError("Please describe the issue in detail.");
        hasError = true;
      } else {
        setDescError("");
      }

      if (hasError) return;
    }

    if (currentStep === "Handover") {
      if (!handoverMethod) return;
      if (!selectedDate || !selectedTime) return;
    }

    if (currentIndex < STEPS.length - 1) {
      setStepInUrl(STEPS[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setStepInUrl(STEPS[currentIndex - 1]);
    }
  };

  const isInvalidStep =
    isMounted && (
      (currentIndex >= 1 && !selectedDevice) ||
      (currentIndex >= 2 && !selectedBrand)
    );

  if (!isMounted || isInvalidStep) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-center">
        <Loader size="md" />
      </div>
    );
  }

  return (
    <>
      <Stepper steps={STEPS} currentStep={currentStep} />
      {currentStep === "Device" ? (
        <DeviceSelector
          devices={DEMO_DEVICES}
          selectedDevice={selectedDevice}
          onSelect={setSelectedDevice}
        />
      ) : currentStep === "Brands" ? (
        <BrandSelector
          brands={currentBrands}
          selectedBrand={selectedBrand}
          onSelect={setSelectedBrand}
        />
      ) : currentStep === "Service" ? (
        <ServiceInfo
          selectedIssue={selectedIssue}
          onSelectIssue={setSelectedIssue}
          description={issueDescription}
          onDescriptionChange={(desc) => {
            setIssueDescription(desc);
            if (descError) setDescError("");
          }}
          modelName={modelName}
          onModelNameChange={(model) => {
            setModelName(model);
            if (modelError) setModelError("");
          }}
          modelError={modelError}
          descError={descError}
        />
      ) : currentStep === "Handover" ? (
        <HandoverSelector 
          selectedHandover={handoverMethod}
          onSelect={setHandoverMethod}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          selectedTime={selectedTime}
          onSelectTime={setSelectedTime}
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
