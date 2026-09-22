import { PaginatedResponse, ApiResponse } from "@/types/admin";
import { Product, ProductApiResponse } from "../types/product.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface GetPublicProductsParams {
  page?: number;
  perPage?: number;
  category?: string;
  brand?: string;
  device?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

const mapProduct = (p: ProductApiResponse): Product => ({
  ...p,
  discountPrice: p.discount_price,
  categoryId: p.product_category_id,
  brandId: p.product_brand_id,
  deviceId: p.product_device_id,
  shortDescription: p.short_description,
  reviewsCount: p.reviews_count,
});

export const publicProductsApi = {
  getProducts: async (params?: GetPublicProductsParams) => {
    const url = new URL(`${API_URL}/products`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetch(url.toString(), {
      next: { revalidate: 180 },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data: PaginatedResponse<ProductApiResponse> = await response.json();
    return {
      ...data,
      data: data.data.map(mapProduct),
    } as PaginatedResponse<Product>;
  },

  getProductBySlug: async (slug: string) => {
    const response = await fetch(`${API_URL}/products/${slug}`, {
      next: { revalidate: 180 },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error("Failed to fetch product details");
    }

    const data: ApiResponse<ProductApiResponse> = await response.json();
    return mapProduct(data.data);
  },

  getCategories: async () => {
    const response = await fetch(`${API_URL}/product-categories`, {
      next: { revalidate: 180 },
      headers: { "Content-Type": "application/json", Accept: "application/json" },
    });
    if (!response.ok) throw new Error("Failed to fetch categories");
    const data = await response.json();

    return data.data || data;
  },

  getBrands: async () => {
    const response = await fetch(`${API_URL}/product-brands`, {
      next: { revalidate: 180 },
      headers: { "Content-Type": "application/json", Accept: "application/json" },
    });
    if (!response.ok) throw new Error("Failed to fetch brands");
    const data = await response.json();
    return data.data || data;
  },

  getDevices: async () => {
    const response = await fetch(`${API_URL}/product-devices`, {
      next: { revalidate: 180 },
      headers: { "Content-Type": "application/json", Accept: "application/json" },
    });
    if (!response.ok) throw new Error("Failed to fetch devices");
    const data = await response.json();
    return data.data || data;
  },

  getFeaturedProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${API_URL}/featured-products`, {
      next: { revalidate: 180 },
      headers: { "Content-Type": "application/json", Accept: "application/json" },
    });
    if (!response.ok) throw new Error("Failed to fetch featured products");
    const data: { data: ProductApiResponse[] } = await response.json();
    return (data.data || []).map(mapProduct);
  },
};
