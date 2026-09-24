import { z } from "zod";

export const brandSchema = z.object({
  name: z.string().min(1, "Brand name is required"),
  slug: z.string().optional(),
  deviceName: z.string().optional(),
  deviceIds: z.array(z.number()).min(1, "At least one device must be selected"),
  icon: z
    .any()
    .refine((val) => val !== null && val !== undefined && val !== "", "Brand icon is required"),
  isActive: z.boolean(),
});

export type BrandFormData = z.infer<typeof brandSchema>;
