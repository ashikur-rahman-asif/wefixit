import { z } from "zod";

export const colorSchema = z.object({
  name: z.string().min(1, "Color name is required"),
  hex: z
    .string()
    .min(1, "Hex code is required")
    .regex(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, "Invalid hex code (e.g. #000000)"),
  isActive: z.boolean(),
});

export type ColorFormData = z.infer<typeof colorSchema>;
