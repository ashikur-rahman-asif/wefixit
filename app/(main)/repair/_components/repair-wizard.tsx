"use client";

import { AuthModal } from "@/components/auth-modal";
import { Loader } from "@/components/ui/loader";

import { ConfirmationStep } from "./confirmation-step";
import { BrandSelector } from "./brand-selector";
import { DeviceSelector } from "./device-selector";
import { HandoverSelector } from "./handover-selector";
import { InfoStep } from "./info-step";
import { NavigationButtons } from "./navigation-buttons";
import { ServiceInfo } from "./service-info";
import { Stepper } from "./stepper";
import { useRepairWizard, WIZARD_STEPS } from "@/features/repairs/hooks/use-repair-wizard";

export function RepairWizard() {
  const {
    devices,
    currentBrands,
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
  } = useRepairWizard();

  if (isGlobalLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-center">
        <Loader size="md" />
      </div>
    );
  }

  return (
    <>
      <Stepper steps={WIZARD_STEPS} currentStep={currentStep} />
      {currentStep === "Device" ? (
        <DeviceSelector devices={devices} />
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
          totalSteps={WIZARD_STEPS.length}
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
