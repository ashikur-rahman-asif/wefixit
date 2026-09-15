import type { ProductColor } from "@/features/products/types/product.types";

export interface CartItem {
  id: string | number;
  title: string;
  price: number;
  image?: string;
  quantity: number;
  color?: ProductColor;
}
