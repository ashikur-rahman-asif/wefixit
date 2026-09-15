export interface ProductColor {
  id: string | number;
  name: string;
  hex: string;
  image?: string;
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
  categoryId?: string | number;
  brandId?: string | number;
  deviceId?: string | number;
  description?: string;
  shortDescription?: string;
  specification?: string;
  images?: string[];
  rating?: number;
  reviewsCount?: number;
  stock?: number;
  colors?: ProductColor[];
}
