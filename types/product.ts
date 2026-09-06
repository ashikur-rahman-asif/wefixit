import { Brand, Device } from "./repair";

export interface ProductColor {
  id: string | number;
  name: string;
  hexCode?: string;
  class?: string;
  ringClass?: string;
}

export interface Category {
  id: string | number;
  name: string;
  slug: string;
}

export interface Product {
  id: string | number;
  title: string;
  slug: string;
  image: string;
  price: number;
  discountPrice?: number;
  categoryId?: Category["id"];
  brandId?: Brand["id"];
  deviceId?: Device["id"];
  description?: string;
  images?: string[];
  rating?: number;
  reviewsCount?: number;
  stock?: number;
  colors?: ProductColor[];
}
