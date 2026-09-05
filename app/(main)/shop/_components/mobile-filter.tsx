"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FilterIcon, X } from "lucide-react";
import { ShopSidebar } from "./shop-sidebar";
import { Category } from "@/types/product";
import { Brand, Device } from "@/types/repair";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

interface MobileFilterProps {
  categories: Category[];
  devices: Device[];
  brands: Brand[];
  currentCategorySlug?: string;
  currentDeviceSlug?: string;
  currentBrandSlug?: string;
  sliderMax: number;
  hasActiveFilters: boolean;
}

export function MobileFilter(props: MobileFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const searchString = searchParams.toString();
  const [prevSearchString, setPrevSearchString] = useState(searchString);

  if (searchString !== prevSearchString) {
    setPrevSearchString(searchString);
    setIsOpen(false);
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Button 
        variant="brand" 
        className="flex items-center gap-2 lg:hidden rounded-md text-base font-semibold py-1.5 px-4 h-auto"
        onClick={() => setIsOpen(true)}
      >
        <FilterIcon className="w-5 h-5" />
        <span>Filter</span>
      </Button>

      <div
        className={cn(
          "fixed inset-0 bg-black/60 z-[998] transition-opacity duration-300 lg:hidden backdrop-blur-sm",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={cn(
          "fixed top-0 right-0 h-dvh w-[85%] max-w-[340px] bg-white z-[999] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200/60 shrink-0 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-[#3E3E59]">Filters</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-500 hover:text-brand transition-colors rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 bg-lightBrand flex-1 overflow-y-auto">
          <ShopSidebar {...props} className="bg-transparent p-0 col-span-1" showHeading={false} />
        </div>
      </div>
    </>
  );
}
