import { Brand, Device } from "./repair";

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
}
