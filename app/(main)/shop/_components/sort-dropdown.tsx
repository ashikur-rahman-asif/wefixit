"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

export function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "default";

  const handleSortChange = (val: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!val || val === "default") {
      params.delete("sort");
    } else {
      params.set("sort", val);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-1">
      <label
        htmlFor="sort-select"
        className="text-base font-semibold text-[#3E3E59]">
        Sort By:
      </label>
      <Select value={currentSort} onValueChange={handleSortChange}>
        <SelectTrigger
          id="sort-select"
          className="bg-lightBrand cursor-pointer border border-gray-300 rounded-md py-2 px-3 h-auto text-base font-semibold text-[#3E3E59] outline-none focus:ring-1 focus:ring-brand w-auto min-w-[140px] shadow-none">
          <SelectValue placeholder="Default">
            {currentSort === "default" && "Default"}
            {currentSort === "price-asc" && "Low to High"}
            {currentSort === "price-desc" && "High to Low"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          <SelectItem
            value="default"
            className="cursor-pointer text-base font-medium">
            Default
          </SelectItem>
          <SelectItem
            value="price-asc"
            className="cursor-pointer text-base font-medium">
            Low to High
          </SelectItem>
          <SelectItem
            value="price-desc"
            className="cursor-pointer text-base font-medium">
            High to Low
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
