import { CheckIcon } from "@/components/icons/check-icon";
import { cn } from "@/lib/utils";
import type { Device } from "@/types/repair";
import Image from "next/image";

interface DeviceSelectorProps {
  devices: Device[];
  selectedDevice: string | null;
  onSelect: (device: string) => void;
}

export function DeviceSelector({
  devices,
  selectedDevice,
  onSelect,
}: DeviceSelectorProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {devices.map((device) => (
        <div
          key={device.name}
          onClick={() => onSelect(device.name)}
          className={cn(
            "relative rounded-[14px] border hover:border-brand transition duration-200 bg-lightBrand py-6 md:py-12 flex flex-col items-center justify-center cursor-pointer",
            selectedDevice === device.name
              ? "border-brand"
              : "border-transparent",
          )}>
          <Image
            src={device.icon}
            alt={device.name}
            width={80}
            height={80}
            className="size-16 md:size-20"
          />
          <h3 className="text-primary font-medium text-xl md:text-[36px] mt-2">
            {device.name}
          </h3>
          {selectedDevice === device.name && (
            <div className="absolute top-3 right-3 bg-brand rounded-full p-1">
              <CheckIcon className="size-3 md:size-4 text-white" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
