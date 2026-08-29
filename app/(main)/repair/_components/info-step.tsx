import { Input } from "@/components/form-elements/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/store/authStore";
import { useRepairStore } from "@/store/use-repair-store";

interface InfoStepProps {
  errors?: Record<string, string>;
  onClearError: (field: string) => void;
}

export function InfoStep({ errors = {}, onClearError }: InfoStepProps) {
  const firstName = useRepairStore((state) => state.firstName);
  const lastName = useRepairStore((state) => state.lastName);
  const email = useRepairStore((state) => state.email);
  const phone = useRepairStore((state) => state.phone);
  const location = useRepairStore((state) => state.location);
  const additionalComments = useRepairStore(
    (state) => state.additionalComments,
  );
  const updateField = useRepairStore((state) => state.updateField);

  const user = useAuthStore((state) => state.user);

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          Your Information
        </h2>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Please provide your contact details so we can reach you about your
          repair.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="First Name"
            size="xl"
            placeholder="Ashikur"
            value={firstName}
            onChange={(e) => {
              updateField("firstName", e.target.value);
              if (errors.firstName) onClearError("firstName");
            }}
            error={errors.firstName}
            required
          />
          <Input
            label="Last Name"
            size="xl"
            placeholder="Asif"
            value={lastName}
            onChange={(e) => {
              updateField("lastName", e.target.value);
              if (errors.lastName) onClearError("lastName");
            }}
            error={errors.lastName}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Email Address"
            type="email"
            size="xl"
            placeholder="asif@gmail.com"
            value={email}
            onChange={(e) => {
              updateField("email", e.target.value);
              if (errors.email) onClearError("email");
            }}
            error={errors.email}
            required
            disabled={!!user}
          />
          <Input
            label="Phone Number"
            type="tel"
            size="xl"
            placeholder="+1 234 567 890"
            value={phone}
            onChange={(e) => {
              updateField("phone", e.target.value);
              if (errors.phone) onClearError("phone");
            }}
            error={errors.phone}
            required
          />
        </div>

        <Input
          label="Location/Address"
          size="xl"
          placeholder="123 Main St, City, Country"
          value={location}
          onChange={(e) => {
            updateField("location", e.target.value);
            if (errors.location) onClearError("location");
          }}
          error={errors.location}
          required
        />

        <div className="flex flex-col">
          <label className="block text-sm md:text-base mb-2 font-medium">
            Additional Comments
          </label>
          <Textarea
            value={additionalComments}
            onChange={(e) => updateField("additionalComments", e.target.value)}
            placeholder="Any other details we should know about?"
            className="min-h-[120px]"
          />
        </div>
      </div>
    </div>
  );
}
