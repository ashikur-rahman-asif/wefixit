import { Button } from "@/components/ui/button";
import { StoreIcon } from "@/components/icons/store-icon";
import { DeliveryIcon } from "@/components/icons/delivery-icon";
import { cn } from "@/lib/utils";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { useRepairStore } from "@/store/use-repair-store";

interface HandoverSelectorProps {
  error?: string;
  onClearError: () => void;
}

const HANDOVER_METHODS = [
  {
    id: "store",
    title: "Bring Us Your Devices To The Store",
    description: "Come to any of our stores and leave your device for repair",
    icon: StoreIcon,
  },
  {
    id: "delivery",
    title: "Urgent Or Express Pickup And Delivery",
    description: "Express mobile repair service: You choose the day and time that suits you",
    icon: DeliveryIcon,
  },
];

export function HandoverSelector({ 
  error,
  onClearError
}: HandoverSelectorProps) {
  const selectedHandover = useRepairStore((state) => state.handoverMethod);
  const selectedDate = useRepairStore((state) => state.selectedDate);
  const selectedTime = useRepairStore((state) => state.selectedTime);
  const updateField = useRepairStore((state) => state.updateField);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="space-y-12">
      <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-6 lg:gap-10">
      {HANDOVER_METHODS.map((method) => {
        const Icon = method.icon;
        return (
          <div
            key={method.id}
            className={cn(
              "flex flex-col bg-lightBrand p-8 rounded-[14px] border transition duration-200 h-full",
              selectedHandover === method.id ? "border-brand ring-1 ring-brand/50" : "border-transparent"
            )}
          >
            <div className="flex items-center justify-center mb-6">
              <Icon />
            </div>
            
            <h3 className="text-[22px] md:text-2xl font-bold text-primary mb-3">
              {method.title}
            </h3>
            
            <p className="text-muted-foreground text-sm md:text-base mb-8 flex-grow leading-relaxed">
              {method.description}
            </p>
            
            <Button 
              variant="brand" 
              className={cn("w-full py-3 text-lg font-semibold", selectedHandover === method.id ? "bg-brand" : "")}
              onClick={() => {
                updateField("handoverMethod", method.id);
                if (error) onClearError();
              }}
            >
              {selectedHandover === method.id && selectedDate && selectedTime
                ? `${formatDate(selectedDate)} | ${selectedTime}`
                : "Select Date & Time"}
            </Button>
          </div>
        );
      })}
      </div>

      {selectedHandover && (
        <div className="max-w-[1000px] mx-auto animate-in fade-in slide-in-from-top-4 duration-500">
          <DateTimePicker
            selectedDate={selectedDate ? new Date(selectedDate) : null}
            onSelectDate={(date) => {
              updateField("selectedDate", date ? date.toISOString() : null);
              if (error && selectedTime) onClearError();
            }}
            selectedTime={selectedTime}
            onSelectTime={(time) => {
              updateField("selectedTime", time);
              if (error && selectedDate) onClearError();
            }}
          />
        </div>
      )}

      {error && (
        <div className="max-w-[1000px] mx-auto text-center mt-4">
          <p className="text-red-500 text-sm font-medium">{error}</p>
        </div>
      )}
    </div>
  );
}
