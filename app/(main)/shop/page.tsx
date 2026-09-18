import Container from "@/components/container";
import { ProductCard } from "@/components/product-card";
import Link from "next/link";
import { ShopSidebar } from "./_components/shop-sidebar";
import { MobileFilter } from "./_components/mobile-filter";
import { SortDropdown } from "./_components/sort-dropdown";
import { ShopPagination } from "./_components/shop-pagination";
import { Suspense } from "react";

import { publicProductsApi } from "@/features/products/api/public-products.api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | WeFixIt",
  description: "Browse our collection of new and pre-owned devices, repair parts, and accessories.",
};

export default async function ShopPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const filterKeys = Object.keys(searchParams).filter(key => key !== 'page');
  const hasActiveFilters = filterKeys.length > 0;

  const currentCategorySlug = searchParams.category as string | undefined;
  const currentDeviceSlug = searchParams.device as string | undefined;
  const currentBrandSlug = searchParams.brand as string | undefined;
  const sortParam = searchParams.sort as string | undefined;
  const pageParam = Number(searchParams.page) || 1;
  const itemsPerPage = 9;

  const minPrice = Number(searchParams.minPrice) || 0;

  const [categories, devices, brands, productsData] = await Promise.all([
    publicProductsApi.getCategories(),
    publicProductsApi.getDevices(),
    publicProductsApi.getBrands(),
    publicProductsApi.getProducts({
      page: pageParam,
      perPage: itemsPerPage,
      category: currentCategorySlug,
      device: currentDeviceSlug,
      brand: currentBrandSlug,
      sort: sortParam,
      minPrice,
      maxPrice: Number(searchParams.maxPrice) || undefined,
    }),
  ]);

  const currentProducts = productsData.data || [];
  
  const fallbackMaxPrice = currentProducts.length > 0
    ? Math.max(...currentProducts.map(p => Number(p.discountPrice || p.price)))
    : 100000;
    
  const sliderMax = productsData.meta?.maxPrice || fallbackMaxPrice;

  const totalPages = productsData.meta?.lastPage || 1;
  const hasProducts = currentProducts.length > 0;

  return (
    <Container className="py-8">
      <div className="flex items-center justify-between lg:justify-end bg-lightBrand lg:bg-transparent p-3 lg:p-0 rounded-md mb-6">
        <MobileFilter 
          categories={categories}
          devices={devices}
          brands={brands}
          currentCategorySlug={currentCategorySlug}
          currentDeviceSlug={currentDeviceSlug}
          currentBrandSlug={currentBrandSlug}
          sliderMax={sliderMax}
          hasActiveFilters={hasActiveFilters}
        />
        <SortDropdown />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <ShopSidebar
          categories={categories}
          devices={devices}
          brands={brands}
          currentCategorySlug={currentCategorySlug}
          currentDeviceSlug={currentDeviceSlug}
          currentBrandSlug={currentBrandSlug}
          sliderMax={sliderMax}
          hasActiveFilters={hasActiveFilters}
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
