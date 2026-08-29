"use client";

import { AuthModal } from "@/components/auth-modal";
import { Loader } from "@/components/ui/loader";
import { useAuthStore } from "@/store/authStore";
import { useRepairStore } from "@/store/use-repair-store";
import type { Brand, Device } from "@/types/repair";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BrandSelector } from "./brand-selector";
import { DeviceSelector } from "./device-selector";
import { HandoverSelector } from "./handover-selector";
import { InfoStep } from "./info-step";
import { NavigationButtons } from "./navigation-buttons";
import { ServiceInfo } from "./service-info";
import { Stepper } from "./stepper";

const STEPS = [
  "Device",
  "Brands",
  "Service",
  "Handover",
  "Info",
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

import { ConfirmationStep } from "./confirmation-step";

export function RepairWizard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [modelError, setModelError] = useState("");
  const [descError, setDescError] = useState("");
  const [handoverError, setHandoverError] = useState("");
  const [infoErrors, setInfoErrors] = useState<Record<string, string>>({});
  const [isMounted, setIsMounted] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const storeData = useRepairStore();

  const currentBrands = DEMO_BRANDS.filter(
    (brand) => brand.deviceName === (storeData.selectedDevice || "Android"),
  );

  const currentStepParam = searchParams.get("step");
  const currentStep = STEPS.includes(currentStepParam as string)
    ? currentStepParam!
    : "Device";

  const currentIndex = STEPS.indexOf(currentStep);

  const setStepInUrl = useCallback(
    (stepName: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("step", stepName);

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    if (!isMounted) return;

    if (currentStep === "Confirmation" || orderId) return;

    if (currentIndex >= 1 && !storeData.selectedDevice) {
      setStepInUrl("Device");
    } else if (currentIndex >= 2 && !storeData.selectedBrand) {
      setStepInUrl("Brands");
    }
  }, [
    isMounted,
    currentIndex,
    storeData.selectedDevice,
    storeData.selectedBrand,
    setStepInUrl,
    currentStep,
    orderId,
  ]);

  const autoFillUserInfo = () => {
    const user = useAuthStore.getState().user;
    if (user) {
      if (!storeData.firstName && user.first_name)
        storeData.updateField("firstName", user.first_name);
      if (!storeData.lastName && user.last_name)
        storeData.updateField("lastName", user.last_name);
      if (!storeData.email && user.email)
        storeData.updateField("email", user.email);
      if (!storeData.phone && user.phone)
        storeData.updateField("phone", user.phone);
    }
  };

  const handleNext = async () => {
    if (currentStep === "Service") {
      let hasError = false;
      if (!storeData.modelName.trim()) {
        setModelError("Device Model is required.");
        hasError = true;
      } else {
        setModelError("");
      }

      if (!storeData.issueDescription.trim()) {
        setDescError("Please describe the issue in detail.");
        hasError = true;
      } else {
        setDescError("");
      }

      if (hasError) return;
    }

    if (currentStep === "Handover") {
      if (!storeData.handoverMethod) {
        setHandoverError("Please select a handover method.");
        return;
      }
      if (!storeData.selectedDate || !storeData.selectedTime) {
        setHandoverError("Please select both date and time.");
        return;
      }
      setHandoverError("");

      if (!isAuthenticated) {
        setShowAuthModal(true);
        return;
      }

      autoFillUserInfo();
    }

    if (currentStep === "Info") {
      const errors: Record<string, string> = {};
      let hasError = false;

      if (!storeData.firstName.trim()) {
        errors.firstName = "First Name is required";
        hasError = true;
      }
      if (!storeData.lastName.trim()) {
        errors.lastName = "Last Name is required";
        hasError = true;
      }
      if (!storeData.email.trim()) {
        errors.email = "Email is required";
        hasError = true;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(storeData.email)) {
        errors.email = "Please enter a valid email address";
        hasError = true;
      }
      if (!storeData.phone.trim()) {
        errors.phone = "Phone number is required";
        hasError = true;
      }
      if (!storeData.location.trim()) {
        errors.location = "Location is required";
        hasError = true;
      }

      setInfoErrors(errors);
      if (hasError) return;

      console.log("Submitting repair request data:", {
        device: storeData.selectedDevice,
        brand: storeData.selectedBrand,
        model: storeData.modelName,
        issue: storeData.issueDescription,
        handover: storeData.handoverMethod,
        date: storeData.selectedDate,
        time: storeData.selectedTime,
        firstName: storeData.firstName,
        lastName: storeData.lastName,
        email: storeData.email,
        phone: storeData.phone,
        location: storeData.location,
      });
      setIsSubmitting(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const mockOrderId = `WFX-${Math.floor(100000 + Math.random() * 900000)}`;
        setOrderId(mockOrderId);

        setStepInUrl("Confirmation");

        storeData.reset();
      } catch (error) {
        console.error("Submission failed", error);
      } finally {
        setIsSubmitting(false);
      }
      return;
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
    isMounted &&
    ((currentIndex >= 1 && !storeData.selectedDevice) ||
      (currentIndex >= 2 && !storeData.selectedBrand)) &&
    currentStep !== "Confirmation";

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
        <DeviceSelector devices={DEMO_DEVICES} />
      ) : currentStep === "Brands" ? (
        <BrandSelector brands={currentBrands} />
      ) : currentStep === "Service" ? (
        <ServiceInfo
          modelError={modelError}
          descError={descError}
          onClearModelError={() => setModelError("")}
          onClearDescError={() => setDescError("")}
        />
      ) : currentStep === "Handover" ? (
        <HandoverSelector
          error={handoverError}
          onClearError={() => setHandoverError("")}
        />
      ) : currentStep === "Info" ? (
        <InfoStep
          errors={infoErrors}
          onClearError={(field) => {
            if (infoErrors[field]) {
              setInfoErrors((prev) => ({ ...prev, [field]: "" }));
            }
          }}
        />
      ) : currentStep === "Confirmation" ? (
        <ConfirmationStep orderId={orderId || "WFX-PENDING"} />
      ) : (
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold text-primary">
            Under Construction
          </h2>
        </div>
      )}

      {currentStep !== "Confirmation" && (
        <NavigationButtons
          currentIndex={currentIndex}
          totalSteps={STEPS.length}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isSubmitting={isSubmitting}
          isSubmitStep={currentStep === "Info"}
        />
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          autoFillUserInfo();
          setStepInUrl("Info");
        }}
        title="Login to Continue"
        description="Please log in to your account to proceed with your repair request."
        registerCallbackUrl="/repair?step=Info"
      />
    </>
  );
}
