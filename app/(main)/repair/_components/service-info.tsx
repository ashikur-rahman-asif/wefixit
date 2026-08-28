import { CheckIcon } from "@/components/icons/check-icon";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Input } from "@/components/form-elements/input";
import { Textarea } from "@/components/ui/textarea";
import { Issue } from "@/types/repair";

const ISSUES: Issue[] = [
  { id: "broken_screen", title: "Broken Screen", icon: "/repair/broken_screen.png" },
  { id: "battery_issue", title: "Battery Issue", icon: "/repair/battery_issue.png" },
  { id: "water_damage", title: "Water Damage", icon: "/repair/water_damage.png" },
  { id: "charging_port", title: "Charging Port", icon: "/repair/charging_port.png" },
  { id: "software_issue", title: "Software/OS", icon: "/repair/software_issue.png" },
  { id: "other", title: "Other", icon: "/repair/other_issue.png" },
];

interface ServiceInfoProps {
  selectedIssue: string | null;
  onSelectIssue: (issue: string) => void;
  description: string;
  onDescriptionChange: (desc: string) => void;
  modelName: string;
  onModelNameChange: (model: string) => void;
  modelError?: string;
  descError?: string;
}

export function ServiceInfo({
  selectedIssue,
  onSelectIssue,
  description,
  onDescriptionChange,
  modelName,
  onModelNameChange,
  modelError,
  descError,
}: ServiceInfoProps) {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-2xl font-semibold text-primary mb-6">Select the main issue</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {ISSUES.map((issue) => (
            <div
              key={issue.id}
              onClick={() => onSelectIssue(issue.id)}
              className={cn(
                "relative rounded-xl border hover:border-brand transition duration-200 bg-lightBrand py-6 flex flex-col items-center justify-center cursor-pointer text-center px-2",
                selectedIssue === issue.id
                  ? "border-brand ring-1 ring-brand/50"
                  : "border-transparent",
              )}>
              <div className="relative size-12 md:size-16 flex items-center justify-center mb-3 mix-blend-multiply">
                <Image
                  src={issue.icon}
                  alt={issue.title}
                  fill
                  sizes="(max-width: 768px) 48px, 64px"
                  className="object-contain"
                />
              </div>
              <h3 className="text-primary font-medium text-sm md:text-base">
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
              onModelNameChange(e.target.value);
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
                onDescriptionChange(e.target.value);
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
