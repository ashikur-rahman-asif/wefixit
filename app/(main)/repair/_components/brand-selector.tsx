import { CheckIcon } from "@/components/icons/check-icon";
import { cn } from "@/lib/utils";
import type { Brand } from "@/types/repair";
import Image from "next/image";
import { useRepairStore } from "@/store/use-repair-store";

interface BrandSelectorProps {
  brands: Brand[];
}

export function BrandSelector({
  brands,
}: BrandSelectorProps) {
  const selectedBrand = useRepairStore((state) => state.selectedBrand);
  const updateField = useRepairStore((state) => state.updateField);

  if (brands.length === 0) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold text-primary">No Brands Found</h2>
        <p className="text-muted-foreground mt-2 max-w-md">
          Please select a valid device first or try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {brands.map((brand) => (
        <div
          key={brand.name}
          onClick={() => updateField("selectedBrand", brand.name)}
          className={cn(
            "relative rounded-[14px] border hover:border-brand transition duration-200 bg-lightBrand py-6 md:py-12 flex flex-col items-center justify-center cursor-pointer",
            selectedBrand === brand.name
              ? "border-brand ring-1 ring-brand/50"
              : "border-transparent",
          )}>
          <div className="relative h-16 md:h-20 w-24 md:w-32 flex items-center justify-center">
            <Image
              src={brand.icon}
              alt={brand.name}
              fill
              sizes="(max-width: 768px) 96px, 128px"
              className="object-contain"
            />
          </div>
          <h3 className="text-primary font-bold text-[22px] md:text-2xl mt-4">
            {brand.name}
          </h3>
          {selectedBrand === brand.name && (
            <div className="absolute top-3 right-3 bg-brand rounded-full p-1">
              <CheckIcon className="size-3 md:size-4 text-white" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
