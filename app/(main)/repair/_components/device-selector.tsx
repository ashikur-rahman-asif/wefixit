import { CheckIcon } from "@/components/icons/check-icon";
import { cn } from "@/lib/utils";
import type { Device } from "@/types/repair";
import Image from "next/image";
import { useRepairStore } from "@/store/use-repair-store";

interface DeviceSelectorProps {
  devices: Device[];
}

export function DeviceSelector({
  devices,
}: DeviceSelectorProps) {
  const selectedDevice = useRepairStore((state) => state.selectedDevice);
  const updateField = useRepairStore((state) => state.updateField);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {devices.map((device) => (
        <div
          key={device.name}
          onClick={() => updateField("selectedDevice", device.name)}
          className={cn(
            "relative rounded-[14px] border hover:border-brand transition duration-200 bg-lightBrand py-6 md:py-12 flex flex-col items-center justify-center cursor-pointer",
            selectedDevice === device.name
              ? "border-brand ring-1 ring-brand/50"
              : "border-transparent",
          )}>
          {device.icon ? (
            <Image
              src={device.icon}
              alt={device.name}
              width={80}
              height={80}
              className="size-16 md:size-20"
            />
          ) : (
            <div className="size-16 md:size-20 bg-black/5 rounded-full flex items-center justify-center text-xs text-secondary">
              No Icon
            </div>
          )}
          <h3 className="text-primary font-bold text-[22px] md:text-2xl mt-4">
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
