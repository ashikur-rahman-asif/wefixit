import type { ProductColor } from "./product";

export interface CartItem {
  id: string | number;
  title: string;
  price: number;
  image?: string;
  quantity: number;
  color?: ProductColor;
}
