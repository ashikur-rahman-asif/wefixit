import * as z from "zod";

export const trackSchema = z
  .object({
    orderId: z
      .string()
      .min(1, "Tracking ID is required")
      .refine(
        (val) => {
          const upper = val.toUpperCase();
          return upper.startsWith("WFX-") || upper.startsWith("ORD-");
        },
        {
          message: "Tracking ID must start with WFX- or ORD-",
        },
      ),
    email: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.orderId.toUpperCase().startsWith("ORD-")) {
      if (!data.email || !z.string().email().safeParse(data.email).success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email is required for product orders",
          path: ["email"],
        });
      }
    }
  });

export type TrackFormValues = z.infer<typeof trackSchema>;
