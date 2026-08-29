import { CheckIcon } from "@/components/icons/check-icon";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Input } from "@/components/form-elements/input";
import { Textarea } from "@/components/ui/textarea";
import { Issue } from "@/types/repair";
import { useRepairStore } from "@/store/use-repair-store";

const ISSUES: Issue[] = [
  { id: "broken_screen", title: "Broken Screen", icon: "/repair/broken_screen.png" },
  { id: "battery_issue", title: "Battery Issue", icon: "/repair/battery_issue.png" },
  { id: "water_damage", title: "Water Damage", icon: "/repair/water_damage.png" },
  { id: "charging_port", title: "Charging Port", icon: "/repair/charging_port.png" },
  { id: "software_issue", title: "Software/OS", icon: "/repair/software_issue.png" },
  { id: "other", title: "Other", icon: "/repair/other_issue.png" },
];

interface ServiceInfoProps {
  modelError?: string;
  descError?: string;
  onClearModelError: () => void;
  onClearDescError: () => void;
}

export function ServiceInfo({
  modelError,
  descError,
  onClearModelError,
  onClearDescError,
}: ServiceInfoProps) {
  const selectedIssue = useRepairStore((state) => state.selectedIssue);
  const modelName = useRepairStore((state) => state.modelName);
  const description = useRepairStore((state) => state.issueDescription);
  const updateField = useRepairStore((state) => state.updateField);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-2xl font-semibold text-primary mb-6">Select the main issue</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {ISSUES.map((issue) => (
            <div
              key={issue.id}
              onClick={() => updateField("selectedIssue", issue.id)}
              className={cn(
                "relative rounded-xl border hover:border-brand transition duration-200 bg-lightBrand py-6 flex flex-col items-center justify-center cursor-pointer text-center px-2",
                selectedIssue === issue.id
                  ? "border-brand ring-1 ring-brand/50"
                  : "border-transparent",
              )}>
              <div className="relative size-12 md:size-16 flex items-center justify-center mix-blend-multiply">
                <Image
                  src={issue.icon}
                  alt={issue.title}
                  fill
                  sizes="(max-width: 768px) 48px, 64px"
                  className="object-contain"
                />
              </div>
              <h3 className="text-primary font-bold text-[22px] md:text-2xl mt-4">
                {issue.title}
              </h3>
              {selectedIssue === issue.id && (
                <div className="absolute top-2 right-2 bg-brand rounded-full p-1">
                  <CheckIcon className="size-3 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-primary">What do you want to fix?</h2>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Our experts will assess your device and get it back to you in no time.
          </p>
        </div>
        
        <div className="flex flex-col gap-6">
          <Input 
            label="Device Model"
            size="xl"
            placeholder="Your device model (e.g., iPhone 13 Pro Max) *"
            value={modelName}
            onChange={(e) => {
              updateField("modelName", e.target.value);
              if (modelError) onClearModelError();
            }}
            error={modelError}
            required
            className="w-full"
          />
          
          <div className="flex flex-col">
            <label className="block text-lg mb-2 font-medium">
              Detailed Description <span className="text-red-500 ml-1">*</span>
            </label>
            <Textarea
              value={description}
              onChange={(e) => {
                updateField("issueDescription", e.target.value);
                if (descError) onClearDescError();
              }}
              placeholder="Please describe the issue in detail..."
              error={descError}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
