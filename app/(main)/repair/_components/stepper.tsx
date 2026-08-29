import { cn } from "@/lib/utils";

interface StepperProps {
  steps: string[];
  currentStep: string;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className="flex items-center justify-center w-full max-w-4xl mx-auto mt-16 mb-8 md:my-20 px-4 md:px-0">
      {steps.map((step, index) => {
        const isActive = index === currentIndex;
        const isCompleted = index < currentIndex;

        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center relative">
              <span
                className={cn(
                  "absolute -top-8 text-xs md:text-base font-medium whitespace-nowrap",
                  isActive || isCompleted ? "text-brand" : "text-primary",
                )}>
                {step}
              </span>
              <div
                className={cn(
                  "size-5 md:size-6 rounded-full border-2 flex items-center justify-center bg-background z-10",
                  isActive || isCompleted ? "border-brand" : "border-gray-300",
                )}>
                {(isActive || isCompleted) && (
                  <div className="size-2 rounded-full bg-brand" />
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-0.5 flex-1",
                  index < currentIndex ? "bg-brand" : "bg-gray-300",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
