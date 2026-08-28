import { Button } from "@/components/ui/button";
import { StoreIcon } from "@/components/icons/store-icon";
import { DeliveryIcon } from "@/components/icons/delivery-icon";
import { cn } from "@/lib/utils";
import { DateTimePicker } from "@/components/ui/date-time-picker";

interface HandoverSelectorProps {
  selectedHandover: string | null;
  onSelect: (method: string) => void;
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
  selectedTime: string | null;
  onSelectTime: (time: string | null) => void;
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
  selectedHandover, 
  onSelect,
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime
}: HandoverSelectorProps) {

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
              onClick={() => onSelect(method.id)}
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
            onSelectDate={(date) => onSelectDate(date.toISOString())}
            selectedTime={selectedTime}
            onSelectTime={onSelectTime}
          />
        </div>
      )}
    </div>
  );
}
