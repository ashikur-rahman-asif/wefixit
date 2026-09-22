import Container from "@/components/container";
import { ProductCard } from "@/components/product-card";
import Link from "next/link";
import { ShopSidebar } from "./_components/shop-sidebar";
import { MobileFilter } from "./_components/mobile-filter";
import { SortDropdown } from "./_components/sort-dropdown";
import { ShopPagination } from "./_components/shop-pagination";
import { Suspense } from "react";
import { Metadata } from "next";

import { publicProductsApi } from "@/features/products/api/public-products.api";
import { PaginatedResponse } from "@/types/admin";
import { Product, ShopFilters, ShopFilterOptions } from "@/features/products/types/product.types";

export const metadata: Metadata = {
  title: "Shop | WeFixIt",
  description: "Browse our collection of new and pre-owned devices, repair parts, and accessories.",
};

// ─── Data Fetcher ─────────────────────────────────────────────────────────────

type ShopData = {
  categories: Awaited<ReturnType<typeof publicProductsApi.getCategories>>;
  devices: Awaited<ReturnType<typeof publicProductsApi.getDevices>>;
  brands: Awaited<ReturnType<typeof publicProductsApi.getBrands>>;
  productsData: PaginatedResponse<Product>;
  error: boolean;
};

const ITEMS_PER_PAGE = 9;

const emptyProductsData: PaginatedResponse<Product> = {
  status: "",
  message: "",
  data: [],
  meta: {} as PaginatedResponse<Product>["meta"],
};

async function getShopData(filters: ShopFilters): Promise<ShopData> {
  try {
    const [categories, devices, brands, productsData] = await Promise.all([
      publicProductsApi.getCategories(),
      publicProductsApi.getDevices(),
      publicProductsApi.getBrands(),
      publicProductsApi.getProducts({
        page: filters.page,
        perPage: ITEMS_PER_PAGE,
        category: filters.category,
        device: filters.device,
        brand: filters.brand,
        sort: filters.sort,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
      }),
    ]);

    return { categories, devices, brands, productsData, error: false };
  } catch {
    return {
      categories: [],
      devices: [],
      brands: [],
      productsData: emptyProductsData,
      error: true,
    };
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ShopPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const filterKeys = Object.keys(searchParams).filter((key) => key !== "page");
  const hasActiveFilters = filterKeys.length > 0;

  const filters: ShopFilters = {
    page: Number(searchParams.page) || 1,
    category: searchParams.category as string | undefined,
    device: searchParams.device as string | undefined,
    brand: searchParams.brand as string | undefined,
    sort: searchParams.sort as string | undefined,
    minPrice: Number(searchParams.minPrice) || 0,
    maxPrice: Number(searchParams.maxPrice) || undefined,
  };

  const { categories, devices, brands, productsData, error } = await getShopData(filters);

  if (error) {
    return (
      <Container className="py-8">
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <p className="text-xl font-semibold">Unable to load products</p>
          <p className="mt-2 text-sm">Please try again later or contact support.</p>
        </div>
      </Container>
    );
  }

  const currentProducts = productsData.data || [];
  const fallbackMaxPrice =
    currentProducts.length > 0
      ? Math.max(...currentProducts.map((p) => Number(p.discountPrice || p.price)))
      : 100000;
  const sliderMax = productsData.meta?.maxPrice || fallbackMaxPrice;
  const totalPages = productsData.meta?.lastPage || 1;
  const hasProducts = currentProducts.length > 0;

  const filterOptions: ShopFilterOptions = { categories, devices, brands };
  const activeFilters = {
    currentCategorySlug: filters.category,
    currentDeviceSlug: filters.device,
    currentBrandSlug: filters.brand,
    sliderMax,
    hasActiveFilters,
  };

  return (
    <Container className="py-8">
      <div className="flex items-center justify-between lg:justify-end bg-lightBrand lg:bg-transparent p-3 lg:p-0 rounded-md mb-6">
        <MobileFilter {...filterOptions} {...activeFilters} />
        <SortDropdown />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <ShopSidebar
          {...filterOptions}
          {...activeFilters}
          className="hidden lg:block lg:col-span-3"
        />
        <section className="col-span-1 lg:col-span-9">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {currentProducts.map((product) => (
              <ProductCard
                key={product.slug}
                image={product.image}
                title={product.title}
                price={product.price}
                discountPrice={product.discountPrice}
                href={`/product/${product.slug}`}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <Suspense fallback={<div className="h-10 mt-8" />}>
              <ShopPagination totalPages={totalPages} />
            </Suspense>
          )}
          {!hasProducts && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <p className="text-xl font-semibold">No products found</p>
              {hasActiveFilters && (
                <>
                  <p className="mt-2 text-sm">Try adjusting your filters</p>
                  <Link href="/shop" className="mt-4 text-brand underline">
                    Clear all filters
                  </Link>
                </>
              )}
            </div>
          )}
        </section>
      </div>
    </Container>
  );
}
