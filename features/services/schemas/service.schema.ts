import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  slug: z.string().optional(),
  deviceIds: z.array(z.number()).min(1, "At least one device must be selected"),
  icon: z
    .any()
    .refine((val) => val !== null && val !== undefined && val !== "", "Service icon is required"),
  isActive: z.boolean(),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;
