import { Button } from "@/components/ui/button";

interface NavigationButtonsProps {
  currentIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
}

export function NavigationButtons({
  currentIndex,
  totalSteps,
  onNext,
  onPrevious,
}: NavigationButtonsProps) {
  return (
    <div className="mt-8 md:mt-12 mb-10 md:mb-16 flex items-center justify-end gap-4 border-t pt-6">
      {currentIndex > 0 && (
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
      )}
      {currentIndex < totalSteps - 1 && (
        <Button variant="brand" onClick={onNext}>
          Next Step
        </Button>
      )}
    </div>
  );
}
