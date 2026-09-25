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

export function getShimmerBase64(w: number, h: number): string {
  const shimmer = `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="20%" />
      <stop stop-color="#edeef1" offset="50%" />
      <stop stop-color="#f6f7f8" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

  const toBase64 =
    typeof window === "undefined" ? Buffer.from(shimmer).toString("base64") : window.btoa(shimmer);

  return `data:image/svg+xml;base64,${toBase64}`;
}
