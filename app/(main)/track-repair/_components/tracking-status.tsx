"use client";

import { Truck, Smartphone, PenTool, ClipboardCheck, PackageCheck, AlertCircle } from "lucide-react";
import React, { useState } from "react";

const STEPS = [
  { id: 'picked-up', title: 'Picked-up', icon: Truck },
  { id: 'receiving', title: 'Receiving Device', icon: Smartphone },
  { id: 'repairing', title: 'Repair in Progress', icon: PenTool },
  { id: 'completed', title: 'Repair Completed', icon: ClipboardCheck },
  { id: 'delivered', title: 'Delivered', icon: PackageCheck },
];

const EVENTS_DATA = [
  {
    id: 1,
    title: "Picked-up: Our delivery agent picked up device",
    time: "June 2, 2024 - 10:30 Am",
  },
  {
    id: 2,
    title: "Receiving Device: Device arrived at our workshop",
    time: "June 3, 2024 - 2:15 Pm",
  },
  {
    id: 3,
    title: "Repair in Progress: Technician is working on it",
    time: "June 4, 2024 - 9:00 Am",
  },
  {
    id: 4,
    title: "Repair Completed: Device passed QA testing",
    time: "June 5, 2024 - 4:20 Pm",
  },
  {
    id: 5,
    title: "Delivered: Device successfully returned to customer",
    time: "June 6, 2024 - 11:30 Am",
  }
];

export function TrackingStatus({ orderId }: { orderId: string }) {
  const [showAll, setShowAll] = useState(false);
  
  const lastChar = orderId.slice(-1);
  const parsedNum = parseInt(lastChar, 10);

  if (isNaN(parsedNum) || orderId.includes("000000")) {
    return (
      <div className="w-full mt-6 md:mt-10 bg-lightBrand/50 rounded-2xl py-10 md:py-16 px-4 text-center mb-6 md:mb-10 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-red-500 mb-6">
          <AlertCircle size={40} strokeWidth={1.5} />
        </div>
        <h2 className="text-primary text-2xl font-bold mb-3">Order Not Found</h2>
        <p className="text-secondary text-base md:text-lg max-w-lg mx-auto leading-relaxed">
          We couldn&apos;t find any repair order matching <span className="font-semibold text-brand">&quot;{orderId}&quot;</span>. Please ensure your Order ID is in the correct format (e.g., WFX-123456) and try again.
        </p>
      </div>
    );
  }

  const currentStepIndex = Math.min(parsedNum, 4); 
  
  const isFullyDelivered = currentStepIndex === STEPS.length - 1;

  const processedEvents = EVENTS_DATA.map((event, index) => {
    let status = "pending";
    if (index < currentStepIndex || isFullyDelivered) status = "completed";
    else if (index === currentStepIndex && !isFullyDelivered) status = "current";
    return { ...event, status };
  });

  const visibleEvents = showAll ? processedEvents : processedEvents.slice(0, currentStepIndex + 1);

  return (
    <div className="w-full mt-6 md:mt-10">
      <div className="bg-lightBrand rounded-xl py-4 md:py-6 px-4 text-center mb-6 md:mb-10">
        <h2 className="text-primary text-xl font-bold mb-2">Info About Your Order</h2>
        <p className="text-brand text-2xl font-bold">{orderId}</p>
      </div>

      <div className="md:mb-7 mb-4">
        <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          Status: <span className="text-brand">{STEPS[currentStepIndex].title}</span>
        </h3>
        <p className="text-secondary text-sm md:text-base max-w-2xl mt-2">
          Here is the up-to-date status of your repair unit.
        </p>
      </div>

      <div className="w-full overflow-x-auto pb-4 md:pb-8 scrollbar-hide">
        <div className="w-full md:min-w-[700px] flex items-start mt-4 px-2 md:px-0">
          
          {STEPS.map((step, index) => {
            const isCompleted = isFullyDelivered ? true : index < currentStepIndex;
            const isCurrent = isFullyDelivered ? false : index === currentStepIndex;
            
            let circleColor = "bg-[#64748b]";
            let textColor = "text-[#64748b]";
            
            if (isCompleted || isFullyDelivered) {
              circleColor = "bg-brand";
              textColor = "text-brand";
            } else if (isCurrent) {
              circleColor = "bg-gold";
              textColor = "text-gold";
            }

            let lineColor = "border-gray-300";
            if (isCompleted) {
              lineColor = "border-brand";
            }

            return (
              <div key={step.id} className="relative flex flex-col items-center gap-2 md:gap-4 flex-1">
                {index < STEPS.length - 1 && (
                  <div className={`absolute left-[50%] w-full top-6 md:top-8 h-0 border-t-[2px] border-dashed ${lineColor} z-0 transition-colors duration-500`}></div>
                )}
                
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full ${circleColor} flex items-center justify-center text-white z-10 relative transition-colors duration-500 shadow-sm`}>
                  <step.icon className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                
                <span className={`${textColor} font-bold text-[11px] md:text-[15px] whitespace-normal md:whitespace-nowrap text-center transition-colors duration-500 leading-tight px-1`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-lightBrand rounded-2xl p-5 md:p-10 mt-6 md:mt-8 mb-8 md:mb-16">
        <div className="relative border-l-[2px] border-dashed border-gray-400 ml-4 pb-4 md:pb-8">
          
          {visibleEvents.map((event, index) => {
            const isLast = index === visibleEvents.length - 1;
            
            let dotBorderColor = "border-gray-400";
            let dotBgColor = "bg-gray-400";
            
            if (event.status === "completed") {
              dotBorderColor = "border-brand";
              dotBgColor = "bg-brand";
            } else if (event.status === "current") {
              dotBorderColor = "border-gold";
              dotBgColor = "bg-gold";
            }

            return (
              <div key={event.id} className={`${isLast ? 'relative' : 'mb-6 md:mb-10 relative'}`}>
                <div className={`absolute -left-[13px] top-1 w-[22px] h-[22px] rounded-full border-2 ${dotBorderColor} bg-white flex items-center justify-center z-10 transition-colors duration-500`}>
                  <div className={`w-[10px] h-[10px] rounded-full ${dotBgColor} transition-colors duration-500`}></div>
                </div>
                <div className="pl-8">
                  <h4 className="text-primary font-bold text-lg">{event.title}</h4>
                  <p className="text-secondary text-sm mt-1">{event.time}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        {EVENTS_DATA.length > 3 && (
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-brand font-medium border-b border-brand pb-0.5 mt-4 ml-4 hover:text-primary hover:border-primary transition-colors"
          >
            {showAll ? "See Less" : "See More"}
          </button>
        )}
      </div>
    </div>
  );
}
