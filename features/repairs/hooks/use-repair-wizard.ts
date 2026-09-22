import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useMounted } from "@/hooks/use-mounted";
import { useAuthStore } from "@/stores/auth.store";
import { useRepairStore } from "@/stores/repair-wizard.store";
import { usePublicDevices } from "@/features/devices/hooks/use-public-devices";
import { usePublicBrands } from "@/features/brands/hooks/use-public-brands";
import { usePublicServices } from "@/features/services/hooks/use-public-services";
import { useSubmitRepair } from "@/features/repairs/hooks/use-submit-repair";

export const WIZARD_STEPS = ["Device", "Brands", "Service", "Handover", "Info", "Confirmation"];

export function useRepairWizard() {
  const { data: devicesResponse, isLoading: isLoadingDevices } = usePublicDevices();
  const devices = devicesResponse?.data || [];

  const { data: brandsResponse, isLoading: isLoadingBrands } = usePublicBrands();
  const brands = brandsResponse?.data || [];

  const { data: servicesResponse } = usePublicServices();
  const services = servicesResponse?.data || [];

  const submitRepairMutation = useSubmitRepair();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [modelError, setModelError] = useState("");
  const [descError, setDescError] = useState("");
  const [handoverError, setHandoverError] = useState("");
  const [infoErrors, setInfoErrors] = useState<Record<string, string>>({});
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isMounted = useMounted();

  const storeData = useRepairStore();

  const selectedDeviceObj = devices.find((d) => d.name === storeData.selectedDevice);

  const currentBrands = brands.filter((brand) =>
    brand.deviceIds?.includes(Number(selectedDeviceObj?.id)),
  );

  const currentServices = services.filter(
    (service) =>
      service.deviceIds?.includes(Number(selectedDeviceObj?.id)) || !service.deviceIds?.length,
  );

  const currentStepParam = searchParams.get("step");
  const currentStep = WIZARD_STEPS.includes(currentStepParam as string)
    ? currentStepParam!
    : "Device";

  const currentIndex = WIZARD_STEPS.indexOf(currentStep);

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
      if (!storeData.lastName && user.last_name) storeData.updateField("lastName", user.last_name);
      if (!storeData.email && user.email) storeData.updateField("email", user.email);
      if (!storeData.phone && user.phone) storeData.updateField("phone", user.phone);
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

      setIsSubmitting(true);

      try {
        const payload = {
          device: storeData.selectedDevice || "",
          brand: storeData.selectedBrand || undefined,
          selectedIssue: storeData.selectedIssue || undefined,
          modelName: storeData.modelName,
          issueDescription: storeData.issueDescription,
          handoverMethod: storeData.handoverMethod || "",
          selectedDate: storeData.selectedDate || undefined,
          selectedTime: storeData.selectedTime || undefined,
          firstName: storeData.firstName,
          lastName: storeData.lastName,
          email: storeData.email,
          phone: storeData.phone,
          location: storeData.location,
          additionalComments: storeData.additionalComments,
        };

        const response = await submitRepairMutation.mutateAsync(payload);

        setOrderId(response?.data?.reference || "WFX-PENDING");

        setStepInUrl("Confirmation");

        storeData.reset();
      } catch (error) {
        console.error("Submission failed", error);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (currentIndex < WIZARD_STEPS.length - 1) {
      setStepInUrl(WIZARD_STEPS[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setStepInUrl(WIZARD_STEPS[currentIndex - 1]);
    }
  };

  const isInvalidStep =
    isMounted &&
    ((currentIndex >= 1 && !storeData.selectedDevice) ||
      (currentIndex >= 2 && !storeData.selectedBrand)) &&
    currentStep !== "Confirmation";

  const isGlobalLoading =
    !isMounted ||
    (currentStep !== "Confirmation" && (isInvalidStep || isLoadingDevices || isLoadingBrands));

  return {
    devices,
    currentBrands,
    currentServices,
    currentStep,
    currentIndex,
    isGlobalLoading,
    orderId,
    isSubmitting,
    showAuthModal,

    modelError,
    descError,
    handoverError,
    infoErrors,

    handleNext,
    handlePrevious,
    setShowAuthModal,
    autoFillUserInfo,
    setStepInUrl,
    setModelError,
    setDescError,
    setHandoverError,
    setInfoErrors,
  };
}
