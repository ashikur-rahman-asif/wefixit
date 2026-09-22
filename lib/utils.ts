import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateDiscountPercentage(price: number, discountPrice?: number): number {
  if (!discountPrice || discountPrice >= price) return 0;
  return Math.round(((price - discountPrice) / price) * 100);
}

export function getOrderStatusColor(status: string): string {
  switch (status) {
    case "pending_payment":
      return "bg-orange-50 text-orange-500";
    case "processing":
      return "bg-cyan-50 text-cyan-600";
    case "completed":
    case "delivered":
      return "bg-green-50 text-green-600";
    case "cancelled":
      return "bg-red-50 text-red-600";
    default:
      return "bg-gray-50 text-gray-600";
  }
}

export function getPaymentStatusColor(status: string): string {
  switch (status) {
    case "paid":
      return "bg-green-50 text-green-600";
    case "failed":
      return "bg-red-50 text-red-600";
    case "refunded":
      return "bg-purple-50 text-purple-600";
    case "pending":
    default:
      return "bg-orange-50 text-orange-500";
  }
}
