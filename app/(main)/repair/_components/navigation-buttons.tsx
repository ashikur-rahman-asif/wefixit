import { Button } from "@/components/ui/button";

interface NavigationButtonsProps {
  currentIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  isSubmitting?: boolean;
  isSubmitStep?: boolean;
}

export function NavigationButtons({
  currentIndex,
  totalSteps,
  onNext,
  onPrevious,
  isSubmitting = false,
  isSubmitStep = false,
}: NavigationButtonsProps) {
  return (
    <div className="mt-8 flex items-center justify-end gap-4 border-t pt-6">
      {currentIndex > 0 && (
        <Button variant="outline" onClick={onPrevious} disabled={isSubmitting}>
          Previous
        </Button>
      )}
      {currentIndex < totalSteps - 1 && (
        <Button variant="brand" onClick={onNext} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : isSubmitStep ? "Submit" : "Next Step"}
        </Button>
      )}
    </div>
  );
}
