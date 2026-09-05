import Container from "@/components/container";
import { ProductCard } from "@/components/product-card";
import { Category, Product } from "@/types/product";
import { Brand, Device } from "@/types/repair";
import Link from "next/link";
import { ShopSidebar } from "./_components/shop-sidebar";
import { MobileFilter } from "./_components/mobile-filter";
import { SortDropdown } from "./_components/sort-dropdown";

const shopProducts: Product[] = [
  {
    id: 1,
    image: "/home-slider/watch.webp",
    title: "Apple Watch Series 8 GPS 41mm",
    price: 199.99,
    discountPrice: 329.0,
    slug: "apple-watch-series-8",
    categoryId: 1,
    brandId: 1,
    deviceId: 3,
  },
  {
    id: 2,
    image: "/home-slider/iphone.webp",
    title: "iPhone 13 Pro Max 256GB – Unlocked",
    price: 549.0,
    discountPrice: 899.0,
    slug: "iphone-13-pro-max",
    categoryId: 2,
    brandId: 1,
    deviceId: 1,
  },
  {
    id: 3,
    image: "/home-slider/android.webp",
    title: "Samsung Galaxy S22 Ultra 128GB",
    price: 399.0,
    discountPrice: 649.99,
    slug: "samsung-galaxy-s22-ultra",
    categoryId: 2,
    brandId: 2,
    deviceId: 1,
  },
  {
    id: 4,
    image: "/home-slider/laptop.webp",
    title: 'MacBook Air M1 13" 8GB RAM',
    price: 699.0,
    discountPrice: 999.0,
    slug: "macbook-air-m1",
    categoryId: 2,
    brandId: 1,
    deviceId: 2,
  },
  {
    id: 5,
    image: "/home-slider/ipad.webp",
    title: "iPad Air 5th Gen 64GB WiFi",
    price: 399.0,
    discountPrice: 599.0,
    slug: "ipad-air-5th-gen",
    categoryId: 2,
    brandId: 1,
    deviceId: 4,
  },
  {
    id: 6,
    image: "/home-slider/tablet.webp",
    title: "Samsung Galaxy Tab S8 128GB",
    price: 329.0,
    discountPrice: 499.99,
    slug: "samsung-galaxy-tab-s8",
    categoryId: 2,
    brandId: 2,
    deviceId: 4,
  },
  {
    id: 7,
    image: "/home-slider/laptop-1st.webp",
    title: "Dell XPS 13 Intel i7 16GB RAM",
    price: 749.0,
    discountPrice: 1099.0,
    slug: "dell-xps-13",
    categoryId: 2,
    brandId: 3,
    deviceId: 2,
  },
  {
    id: 8,
    image: "/home-slider/main.webp",
    title: "GoPro HERO6 4K Action Camera",
    price: 99.5,
    discountPrice: 149.99,
    slug: "gopro-hero6",
    categoryId: 1,
    brandId: 4,
    deviceId: 5,
  },
  {
    id: 9,
    image: "/home-slider/iphone.webp",
    title: "iPhone 14 Pro 128GB",
    price: 799.0,
    slug: "iphone-14-pro",
    categoryId: 2,
    brandId: 1,
    deviceId: 1,
  },
  {
    id: 10,
    image: "/home-slider/watch.webp",
    title: "Apple Watch Ultra Titanium",
    price: 649.0,
    discountPrice: 799.0,
    slug: "apple-watch-ultra",
    categoryId: 1,
    brandId: 1,
    deviceId: 3,
  },
  {
    id: 11,
    image: "/home-slider/android.webp",
    title: "Google Pixel 7 Pro 128GB",
    price: 499.0,
    slug: "google-pixel-7-pro",
    categoryId: 2,
    brandId: 5,
    deviceId: 1,
  },
  {
    id: 12,
    image: "/home-slider/laptop.webp",
    title: 'MacBook Pro 14" M2 Pro',
    price: 1499.0,
    discountPrice: 1999.0,
    slug: "macbook-pro-14",
    categoryId: 2,
    brandId: 1,
    deviceId: 2,
  },
  {
    id: 13,
    image: "/home-slider/tablet.webp",
    title: "iPad Pro 11-inch M2",
    price: 749.0,
    slug: "ipad-pro-11",
    categoryId: 2,
    brandId: 1,
    deviceId: 4,
  },
];

const categories: Category[] = [
  { id: 1, name: "New Accessories", slug: "new-accessories" },
  { id: 2, name: "Pre Owned", slug: "pre-owned" },
];

const devices: Device[] = [
  { id: 1, name: "Mobile", slug: "mobile" },
  { id: 2, name: "Laptop", slug: "laptop" },
  { id: 3, name: "Watch", slug: "watch" },
  { id: 4, name: "Tablet", slug: "tablet" },
  { id: 5, name: "Camera", slug: "camera" },
];

const brands: Brand[] = [
  { id: 1, name: "Apple", deviceName: "Multiple", slug: "apple" },
  { id: 2, name: "Samsung", deviceName: "Multiple", slug: "samsung" },
  { id: 3, name: "Dell", deviceName: "Laptop", slug: "dell" },
  { id: 4, name: "GoPro", deviceName: "Camera", slug: "gopro" },
  { id: 5, name: "Google", deviceName: "Mobile", slug: "google" },
  { id: 6, name: "Xiaomi", deviceName: "Mobile", slug: "xiaomi" },
];

export default async function ShopPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const hasActiveFilters = Object.keys(searchParams).length > 0;

  const currentCategorySlug = searchParams.category as string | undefined;
  const currentDeviceSlug = searchParams.device as string | undefined;
  const currentBrandSlug = searchParams.brand as string | undefined;
  const sortParam = searchParams.sort as string | undefined;

  const highestPrice = Math.max(
    ...shopProducts.map((p) => p.discountPrice ?? p.price),
  );
  const sliderMax = Math.ceil(highestPrice / 100) * 100;

  const minPrice = Number(searchParams.minPrice) || 0;
  const maxPrice = Number(searchParams.maxPrice) || sliderMax;

  const activeCategoryId = categories.find(
    (c) => c.slug === currentCategorySlug,
  )?.id;
  const activeDeviceId = devices.find((d) => d.slug === currentDeviceSlug)?.id;
  const activeBrandId = brands.find((b) => b.slug === currentBrandSlug)?.id;

  let filteredProducts = shopProducts.filter((p) => {
    const finalPrice = p.discountPrice ?? p.price;
    return finalPrice >= minPrice && finalPrice <= maxPrice;
  });

  if (activeCategoryId) {
    filteredProducts = filteredProducts.filter(
      (p) => p.categoryId === activeCategoryId,
    );
  }
  if (activeDeviceId) {
    filteredProducts = filteredProducts.filter(
      (p) => p.deviceId === activeDeviceId,
    );
  }
  if (activeBrandId) {
    filteredProducts = filteredProducts.filter(
      (p) => p.brandId === activeBrandId,
    );
  }

  if (sortParam === "price-asc") {
    filteredProducts.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price));
  } else if (sortParam === "price-desc") {
    filteredProducts.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price));
  }

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
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.slug}
                image={product.image}
                title={product.title}
                price={product.price}
                discountPrice={product.discountPrice}
                href={`/shop/${product.slug}`}
              />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <p className="text-xl font-semibold">No products found</p>
              <p className="mt-2 text-sm">Try adjusting your filters</p>
              <Link href="/shop" className="mt-4 text-brand underline">
                Clear all filters
              </Link>
            </div>
          )}
        </section>
      </div>
    </Container>
  );
}
