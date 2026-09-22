export const SHIPPING_FLAT = 15;
export const FREE_SHIPPING_THRESHOLD = 1000;

export function calculateShipping(subtotal: number): number {
  if (subtotal <= 0) return 0;
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return SHIPPING_FLAT;
}
