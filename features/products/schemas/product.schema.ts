import { z } from "zod";

export const productCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  slug: z.string().optional(),
  isActive: z.boolean(),
});
export type ProductCategoryFormData = z.infer<typeof productCategorySchema>;

export const ecommerceBrandSchema = z.object({
  name: z.string().min(1, "Brand name is required"),
  slug: z.string().optional(),
  isActive: z.boolean(),
});
export type EcommerceBrandFormData = z.infer<typeof ecommerceBrandSchema>;

export const ecommerceDeviceSchema = z.object({
  name: z.string().min(1, "Device name is required"),
  slug: z.string().optional(),
  isActive: z.boolean(),
});
export type EcommerceDeviceFormData = z.infer<typeof ecommerceDeviceSchema>;

const optionalNumber = z
  .union([z.literal(""), z.coerce.number().min(0, "Must be 0 or more")])
  .optional();

const optionalId = z.union([z.literal(""), z.coerce.number().int().positive()]).optional();

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
  specifications: z
    .array(
      z.object({
        key: z.string().min(1, "Key is required"),
        value: z.string().min(1, "Value is required"),
      }),
    )
    .optional(),
  stock: z.coerce.number().min(0, "Stock cannot be negative").default(0),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
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
          .regex(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, "Valid hex code required"),
        stock: z.coerce.number().min(0).default(0),
        position: z.coerce.number().min(0).default(0),
        image: z
          .union([z.instanceof(File), z.string()])
          .nullable()
          .optional(),
        images: z.array(z.union([z.instanceof(File), z.string()])).default([]),
      }),
    )
    .default([]),
});

export type ProductFormData = z.infer<typeof productSchema>;
export type ProductFormInput = z.input<typeof productSchema>;
