export interface ProductColor {
  id: string | number;
  name: string;
  hex: string;
  image?: string;
  images?: string[];
}

export interface Category {
  id: string | number;
  name: string;
  slug: string;
  icon?: string | null;
}

export interface Brand {
  id: string | number;
  name: string;
  slug: string;
  icon?: string | null;
}

export interface Device {
  id: string | number;
  name: string;
  slug: string;
  icon?: string | null;
}

export interface Product {
  id: string | number;
  title: string;
  slug: string;
  image: string;
  price: number;
  discountPrice?: number;
  categoryId?: string | number;
  brandId?: string | number;
  deviceId?: string | number;
  description?: string;
  shortDescription?: string;
  specification?: string;
  specifications?: { key: string; value: string }[];
  images?: string[];
  rating?: number;
  reviewsCount?: number;
  stock?: number;
  colors?: ProductColor[];
}
