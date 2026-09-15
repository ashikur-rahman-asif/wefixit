import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  slug: z.string().optional(),
  deviceIds: z.array(z.number()).min(1, "At least one device must be selected"),
  icon: z.any().refine((val) => val !== null && val !== undefined && val !== "", "Service icon is required"),
  isActive: z.boolean(),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

export const gradeSchema = z.object({
  name: z.string().min(1, "Grade name is required"),
  description: z.string().optional(),
  is_active: z.boolean(),
});

export type GradeFormData = z.infer<typeof gradeSchema>;

export const brandSchema = z.object({
  name: z.string().min(1, "Brand name is required"),
  slug: z.string().optional(),
  deviceName: z.string().optional(),
  deviceIds: z.array(z.number()).min(1, "At least one device must be selected"),
  icon: z.any().refine((val) => val !== null && val !== undefined && val !== "", "Brand icon is required"),
  is_active: z.boolean(),
});

export type BrandFormData = z.infer<typeof brandSchema>;

export const deviceSchema = z.object({
  name: z.string().min(1, "Device name is required"),
  slug: z.string().optional(),
  icon: z.any().refine((val) => val !== null && val !== undefined && val !== "", "Device icon is required"),
  is_active: z.boolean(),
});

export type DeviceFormData = z.infer<typeof deviceSchema>;

export const colorSchema = z.object({
  name: z.string().min(1, "Color name is required"),
  hex: z.string().min(1, "Hex code is required").regex(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, "Invalid hex code (e.g. #000000)"),
  is_active: z.boolean(),
});

export type ColorFormData = z.infer<typeof colorSchema>;
