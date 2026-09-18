import { Input } from "@/components/form-elements/input";
import { CheckIcon } from "@/components/icons/check-icon";
import { Textarea } from "@/components/ui/textarea";
import { Service } from "@/features/services/api/public-services.api";
import { cn } from "@/lib/utils";
import { useRepairStore } from "@/stores/repair-wizard.store";
import Image from "next/image";

interface ServiceInfoProps {
  services: Service[];
  modelError?: string;
  descError?: string;
  onClearModelError: () => void;
  onClearDescError: () => void;
}

export function ServiceInfo({
  services,
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
        <h2 className="text-2xl font-semibold text-primary mb-6">
          Select the main issue
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.length === 0 ? (
            <div className="col-span-full py-8 text-center text-muted-foreground">
              No services found.
            </div>
          ) : (
            services.map((issue) => (
              <div
                key={issue.id}
                onClick={() => updateField("selectedIssue", issue.slug)}
                className={cn(
                  "relative rounded-xl border hover:border-brand transition duration-200 bg-lightBrand py-6 flex flex-col items-center justify-center cursor-pointer text-center px-2",
                  selectedIssue === issue.slug
                    ? "border-brand ring-1 ring-brand/50"
                    : "border-transparent",
                )}>
                <div className="relative size-12 md:size-16 flex items-center justify-center mix-blend-multiply">
                  {issue.icon ? (
                    <Image
                      src={issue.icon}
                      alt={issue.name}
                      fill
                      sizes="(max-width: 768px) 48px, 64px"
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">No Icon</span>
                  )}
                </div>
                <h3 className="text-primary font-bold text-[22px] md:text-2xl mt-4">
                  {issue.name}
                </h3>
                {selectedIssue === issue.slug && (
                  <div className="absolute top-2 right-2 bg-brand rounded-full p-1">
                    <CheckIcon className="size-3 text-white" />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-primary">
            What do you want to fix?
          </h2>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Our experts will assess your device and get it back to you in no
            time.
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
