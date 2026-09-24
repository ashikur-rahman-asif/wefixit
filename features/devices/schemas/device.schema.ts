import { z } from "zod";

export const deviceSchema = z.object({
  name: z.string().min(1, "Device name is required"),
  slug: z.string().optional(),
  icon: z
    .any()
    .refine((val) => val !== null && val !== undefined && val !== "", "Device icon is required"),
  isActive: z.boolean(),
});

export type DeviceFormData = z.infer<typeof deviceSchema>;
