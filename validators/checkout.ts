import { z } from "zod";
import { User } from "@/types/auth";

export const checkoutSchema = z.object({
  firstName: z.string().trim().min(2, "First name is required"),
  lastName: z.string().trim().min(2, "Last name is required"),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().trim().min(10, "Valid phone number is required"),
  address: z.string().trim().min(5, "Address is required"),
  city: z.string().trim().min(2, "City is required"),
  zipCode: z.string().trim().min(4, "ZIP/Postal code is required"),
  paymentMethod: z.enum(["stripe", "cod"], {
    message: "Please select a payment method",
  }),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export const getCheckoutDefaultValues = (
  user: User | null | undefined,
  formData: Partial<CheckoutInput>
): CheckoutInput => ({
  firstName: formData?.firstName || user?.first_name || "",
  lastName: formData?.lastName || user?.last_name || "",
  email: formData?.email || user?.email || "",
  phone: formData?.phone || user?.phone || "",
  address: formData?.address || "",
  city: formData?.city || "",
  zipCode: formData?.zipCode || "",
  paymentMethod: (formData?.paymentMethod as "stripe" | "cod") ?? "stripe",
});
