"use client";

import {
  AlertCircle,
  ClipboardCheck,
  PackageCheck,
  PenTool,
  Smartphone,
  Truck,
  Wallet,
  Package,
  XCircle,
} from "lucide-react";
import { PageLoader } from "@/components/ui/loader";
import { useTrackRepair } from "@/features/repairs/hooks/use-track-repair";
import { useTrackOrder } from "@/features/orders/hooks/use-track-order";
import { cn } from "@/lib/utils";

const REPAIR_STEPS = [
  { id: "picked-up", title: "Picked-up", icon: Truck },
  { id: "receiving", title: "Receiving Device", icon: Smartphone },
  { id: "repairing", title: "Repair in Progress", icon: PenTool },
  { id: "completed", title: "Repair Completed", icon: ClipboardCheck },
  { id: "delivered", title: "Delivered", icon: PackageCheck },
];

const ORDER_STEPS = [
  { id: "pending_payment", title: "Pending Payment", icon: Wallet },
  { id: "processing", title: "Processing", icon: Package },
  { id: "completed", title: "Completed", icon: PackageCheck },
];

export function TrackingStatus({ orderId, email }: { orderId: string; email?: string }) {
  const cleanOrderId = orderId.trim().toUpperCase();

  const isRepair = cleanOrderId.startsWith("WFX-");
  const isOrder = cleanOrderId.startsWith("ORD-");

  const repairRef = isRepair ? cleanOrderId : "";
  const orderRef = isOrder ? cleanOrderId : "";

  const {
    data: repairData,
    isLoading: repairLoading,
    isError: repairError,
  } = useTrackRepair(repairRef);

  const {
    data: orderData,
    isLoading: orderLoading,
    isError: orderError,
  } = useTrackOrder({ reference: orderRef, email: email || "" });

  const isLoading = repairLoading || orderLoading;
  const isError = (!isRepair && !isOrder) || (isRepair && repairError) || (isOrder && orderError);

  if (!isRepair && !isOrder && cleanOrderId) {
    return (
      <div className="w-full mt-6 md:mt-10 bg-lightBrand/50 rounded-2xl py-10 md:py-16 px-4 text-center mb-6 md:mb-10 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-red-500 mb-6">
          <AlertCircle size={40} strokeWidth={1.5} />
        </div>
        <h2 className="text-primary text-2xl font-bold mb-3">Invalid Tracking ID</h2>
        <p className="text-secondary text-base md:text-lg max-w-lg mx-auto leading-relaxed">
          Tracking ID must start with <span className="font-semibold text-brand">WFX-</span> or{" "}
          <span className="font-semibold text-brand">ORD-</span>.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full mt-6 md:mt-10 bg-lightBrand/50 rounded-2xl mb-6 md:mb-10">
        <PageLoader message="Tracking your order..." className="py-16" />
      </div>
    );
  }

  if (isError || (isRepair && !repairData?.data) || (isOrder && !orderData?.data)) {
    return (
      <div className="w-full mt-6 md:mt-10 bg-lightBrand/50 rounded-2xl py-10 md:py-16 px-4 text-center mb-6 md:mb-10 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-red-500 mb-6">
          <AlertCircle size={40} strokeWidth={1.5} />
        </div>
        <h2 className="text-primary text-2xl font-bold mb-3">Order Not Found</h2>
        <p className="text-secondary text-base md:text-lg max-w-lg mx-auto leading-relaxed">
          We couldn&apos;t find any order matching{" "}
          <span className="font-semibold text-brand">&quot;{cleanOrderId}&quot;</span>
          {isOrder ? " with the provided email address." : "."} Please ensure your details are correct and try again.
        </p>
      </div>
    );
  }

  let steps = REPAIR_STEPS;
  let statusLabel = "";
  let currentStepIndex = 0;
  let isFullyDelivered = false;
  let isCancelled = false;

  if (isRepair && repairData?.data) {
    steps = REPAIR_STEPS;
    statusLabel = repairData.data.statusLabel;
    currentStepIndex = repairData.data.trackingStep;
    isFullyDelivered = currentStepIndex === steps.length - 1;
  } else if (isOrder && orderData?.data) {
    steps = ORDER_STEPS;
    const orderStatus = orderData.data.status;
    statusLabel = orderStatus.replace("_", " ").toUpperCase();
    
    if (orderStatus === "pending_payment") currentStepIndex = 0;
    else if (orderStatus === "processing") currentStepIndex = 1;
    else if (orderStatus === "completed") currentStepIndex = 2;
    else if (orderStatus === "cancelled") {
      currentStepIndex = 0;
      isCancelled = true;
    }
    
    isFullyDelivered = orderStatus === "completed";
  }

  const processedEvents = steps.map((step, index) => {
    let dotStatus = "pending";
    if (isCancelled) {
      dotStatus = index === 0 ? "cancelled" : "pending";
    } else if (index < currentStepIndex || isFullyDelivered) {
      dotStatus = "completed";
    } else if (index === currentStepIndex) {
      dotStatus = "current";
    }
    return { ...step, dotStatus };
  });

  return (
    <div className="w-full mt-6 md:mt-10">
      <div className="bg-lightBrand rounded-xl py-4 md:py-6 px-4 text-center mb-6 md:mb-10">
        <h2 className="text-primary text-xl font-bold mb-2">Info About Your Order</h2>
        <p className="text-brand text-2xl font-bold">{cleanOrderId}</p>
      </div>

      <div className="md:mb-7 mb-4">
        <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2 flex items-center gap-2">
          Status:{" "}
          <span className={cn(isCancelled ? "text-red-500" : "text-brand")}>
            {statusLabel}
          </span>
          {isCancelled && <XCircle className="text-red-500 w-8 h-8" />}
        </h3>
        <p className="text-secondary text-sm md:text-base max-w-2xl mt-2">
          Here is the up-to-date status of your {isRepair ? "repair unit" : "order"}.
        </p>
      </div>

      <div className="w-full overflow-x-auto pb-4 md:pb-8 scrollbar-hide">
        <div className="w-full md:min-w-[700px] flex items-start mt-4 px-2 md:px-0">
          {steps.map((step, index) => {
            const dotStatus = processedEvents[index].dotStatus;
            let bgColor = "bg-gray-100";
            let borderColor = "border-gray-200";
            let iconColor = "text-gray-400";

            if (dotStatus === "completed") {
              bgColor = "bg-brand text-white";
              borderColor = "border-brand";
              iconColor = "text-white";
            } else if (dotStatus === "current") {
              bgColor = "bg-white border-2";
              borderColor = "border-brand";
              iconColor = "text-brand";
            } else if (dotStatus === "cancelled") {
              bgColor = "bg-red-500 text-white";
              borderColor = "border-red-500";
              iconColor = "text-white";
            }

            return (
              <div
                key={step.id}
                className={cn(
                  "flex flex-col items-center relative",
                  index !== steps.length - 1 ? "flex-1" : "w-24 md:w-32"
                )}>
                <div
                  className={cn(
                    "w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center z-10 transition-all duration-300",
                    bgColor,
                    dotStatus === "current" ? borderColor : ""
                  )}>
                  <step.icon
                    className={cn(
                      "w-5 h-5 md:w-6 md:h-6",
                      iconColor
                    )}
                  />
                </div>
                {index !== steps.length - 1 && (
                  <div
                    className={cn(
                      "absolute top-5 md:top-7 left-1/2 w-full h-[2px] -z-0",
                      dotStatus === "completed" ? "bg-brand" : "bg-gray-200",
                      isCancelled && "bg-gray-200"
                    )}
                  />
                )}
                <p
                  className={cn(
                    "mt-3 text-xs md:text-sm font-medium text-center w-24 md:w-32",
                    dotStatus === "completed" || dotStatus === "current" || dotStatus === "cancelled"
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}>
                  {step.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
