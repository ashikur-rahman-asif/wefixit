"use client";

import { AuthModal } from "@/components/auth-modal";

import {
  useRepairWizard,
  WIZARD_STEPS,
} from "@/features/repairs/hooks/use-repair-wizard";
import { BrandSelector } from "./brand-selector";
import { ConfirmationStep } from "./confirmation-step";
import { DeviceSelector } from "./device-selector";
import { HandoverSelector } from "./handover-selector";
import { InfoStep } from "./info-step";
import { NavigationButtons } from "./navigation-buttons";
import { ServiceInfo } from "./service-info";
import { Stepper } from "./stepper";

export function RepairWizard() {
  const {
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
  } = useRepairWizard();

  const renderContent = () => {
    if (isGlobalLoading) {
      return (
        <div className="w-full animate-pulse mt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="relative rounded-[14px] border border-transparent bg-muted/20 py-6 md:py-12 flex flex-col items-center justify-center">
                <div className="size-16 md:size-20 rounded-full bg-muted mb-4" />
                <div className="w-24 md:w-32 h-6 md:h-7 rounded-md bg-muted" />
              </div>
            ))}
          </div>
        </div>
      );
    }

    switch (currentStep) {
      case "Device":
        return <DeviceSelector devices={devices} />;
      case "Brands":
        return <BrandSelector brands={currentBrands} />;
      case "Service":
        return (
          <ServiceInfo
            services={currentServices}
            modelError={modelError}
            descError={descError}
            onClearModelError={() => setModelError("")}
            onClearDescError={() => setDescError("")}
          />
        );
      case "Handover":
        return (
          <HandoverSelector
            error={handoverError}
            onClearError={() => setHandoverError("")}
          />
        );
      case "Info":
        return (
          <InfoStep
            errors={infoErrors}
            onClearError={(field) => {
              if (infoErrors[field]) {
                setInfoErrors((prev) => ({ ...prev, [field]: "" }));
              }
            }}
          />
        );
      case "Confirmation":
        return <ConfirmationStep orderId={orderId || "WFX-PENDING"} />;
      default:
        return (
          <div className="py-24 flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl font-bold text-primary">
              Under Construction
            </h2>
          </div>
        );
    }
  };

  return (
    <>
      <Stepper steps={WIZARD_STEPS} currentStep={currentStep} />

      {renderContent()}

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
