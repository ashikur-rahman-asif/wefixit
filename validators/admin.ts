import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  slug: z.string().optional(),
  deviceIds: z.array(z.number()).min(1, "At least one device must be selected"),
  icon: z
    .any()
    .refine(
      (val) => val !== null && val !== undefined && val !== "",
      "Service icon is required",
    ),
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
  icon: z
    .any()
    .refine(
      (val) => val !== null && val !== undefined && val !== "",
      "Brand icon is required",
    ),
  is_active: z.boolean(),
});

export type BrandFormData = z.infer<typeof brandSchema>;

export const deviceSchema = z.object({
  name: z.string().min(1, "Device name is required"),
  slug: z.string().optional(),
  icon: z
    .any()
    .refine(
      (val) => val !== null && val !== undefined && val !== "",
      "Device icon is required",
    ),
  is_active: z.boolean(),
});

export type DeviceFormData = z.infer<typeof deviceSchema>;

export const colorSchema = z.object({
  name: z.string().min(1, "Color name is required"),
  hex: z
    .string()
    .min(1, "Hex code is required")
    .regex(
      /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,
      "Invalid hex code (e.g. #000000)",
    ),
  is_active: z.boolean(),
});

export type ColorFormData = z.infer<typeof colorSchema>;

/**
 * Optional numeric field that may be left blank. The blank literal comes first
 * so an empty input stays `""` instead of being coerced to 0.
 */
const optionalNumber = z
  .union([z.literal(""), z.coerce.number().min(0, "Must be 0 or more")])
  .optional();

/** Optional foreign key from a select, where "" means "none". */
const optionalId = z
  .union([z.literal(""), z.coerce.number().int().positive()])
  .optional();

export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be positive"),
  discountPrice: optionalNumber,
  categoryId: optionalId,
  brandId: optionalId,
  deviceId: optionalId,
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  specification: z.string().optional(),
  stock: z.coerce.number().min(0, "Stock cannot be negative").default(0),
  isActive: z.boolean().default(true),
  image: z
    .union([z.instanceof(File), z.string()])
    .nullable()
    .optional(),
  images: z.array(z.union([z.instanceof(File), z.string()])).default([]),
  colors: z
    .array(
      z.object({
        id: z.number().optional(),
        name: z.string().min(1, "Color name is required"),
        hex: z
          .string()
          .regex(
            /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,
            "Valid hex code required",
          ),
        stock: z.coerce.number().min(0).default(0),
        position: z.coerce.number().min(0).default(0),
        image: z
          .union([z.instanceof(File), z.string()])
          .nullable()
          .optional(),
      }),
    )
    .default([]),
});

export type ProductFormData = z.infer<typeof productSchema>;
