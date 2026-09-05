import Link from "next/link";
import { cn } from "@/lib/utils";
import { Category } from "@/types/product";
import { Brand, Device } from "@/types/repair";
import { PriceRange } from "./price-range";

interface ShopSidebarProps {
  categories: Category[];
  devices: Device[];
  brands: Brand[];
  currentCategorySlug?: string;
  currentDeviceSlug?: string;
  currentBrandSlug?: string;
  sliderMax: number;
  hasActiveFilters: boolean;
  className?: string;
  showHeading?: boolean;
}

export function ShopSidebar({
  categories,
  devices,
  brands,
  currentCategorySlug,
  currentDeviceSlug,
  currentBrandSlug,
  sliderMax,
  hasActiveFilters,
  className,
  showHeading = true,
}: ShopSidebarProps) {
  const buildUrl = (key: string, value: string | undefined) => {
    const params = new URLSearchParams();
    if (currentCategorySlug) params.set("category", currentCategorySlug);
    if (currentDeviceSlug) params.set("device", currentDeviceSlug);
    if (currentBrandSlug) params.set("brand", currentBrandSlug);
    
    if (value && params.get(key) === value) {
      params.delete(key);
    } else if (value) {
      params.set(key, value);
    }
    return `?${params.toString()}`;
  };

  return (
    <aside className={cn("col-span-3 h-fit self-start bg-lightBrand p-6 rounded-md space-y-6", className)}>
      {showHeading && (
        <div className="flex items-center justify-between pb-4 border-b border-gray-200/60">
          <h2 className="text-xl font-bold text-[#3E3E59]">Filters</h2>
          {hasActiveFilters && (
            <Link href="/shop" className="text-sm font-semibold text-brand hover:underline">
              Clear all
            </Link>
          )}
        </div>
      )}
      <div>
        <h3 className="text-lg font-bold text-[#3E3E59]">Categories</h3>
        <ul className="pt-2 space-y-2">
          {categories.map((category) => {
            const isActive = currentCategorySlug === category.slug;
            return (
              <li key={category.id}>
                <Link
                  href={buildUrl("category", category.slug)}
                  className={cn(
                    "font-semibold transition-colors",
                    isActive
                      ? "text-brand underline"
                      : "text-[#807E7E] hover:text-brand"
                  )}
                >
                  {category.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-bold text-[#3E3E59]">Devices</h3>
        <ul className="pt-2 space-y-2">
          {devices.map((device) => {
            const isActive = currentDeviceSlug === device.slug;
            return (
              <li key={device.id}>
                <Link
                  href={buildUrl("device", device.slug)}
                  className={cn(
                    "font-semibold transition-colors",
                    isActive
                      ? "text-brand underline"
                      : "text-[#807E7E] hover:text-brand"
                  )}
                >
                  {device.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-bold text-[#3E3E59]">Price</h3>
        <PriceRange maxRange={sliderMax} />
      </div>

      <div>
        <h3 className="text-lg font-bold text-[#3E3E59]">Brands</h3>
        <ul className="pt-2 space-y-2">
          {brands.map((brand) => {
            const isActive = currentBrandSlug === brand.slug;
            return (
              <li key={brand.id}>
                <Link
                  href={buildUrl("brand", brand.slug)}
                  className={cn(
                    "font-semibold transition-colors",
                    isActive
                      ? "text-brand underline"
                      : "text-[#807E7E] hover:text-brand"
                  )}
                >
                  {brand.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
