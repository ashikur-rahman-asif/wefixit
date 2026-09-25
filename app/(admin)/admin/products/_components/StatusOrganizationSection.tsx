"use client";

import { Controller, Control, useWatch } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductFormInput } from "@/features/products/schemas/product.schema";
import { cn } from "@/lib/utils";

interface StatusOrganizationSectionProps {
  control: Control<ProductFormInput>;
  categories: { id: number | string; name: string; isActive?: boolean }[];
  brands: { id: number | string; name: string; isActive?: boolean }[];
}

export function StatusOrganizationSection({
  control,
  categories,
  brands,
}: StatusOrganizationSectionProps) {
  const watchedCategoryId = useWatch({
    control,
    name: "categoryId",
  });

  const watchedBrandId = useWatch({
    control,
    name: "brandId",
  });

  const activeCategories = categories.filter(
    (c) => c.isActive !== false || c.id.toString() === watchedCategoryId?.toString(),
  );

  const activeBrands = brands.filter(
    (b) => b.isActive !== false || b.id.toString() === watchedBrandId?.toString(),
  );

  const selectedCategory = categories.find(
    (c) => c.id.toString() === watchedCategoryId?.toString(),
  );
  const isPreOwnedCategory = selectedCategory?.name.toLowerCase() === "pre owned";

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-6">
      <h2 className="text-xl font-bold text-titleBlack">Status & Organization</h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100">
          <div>
            <label className="text-sm font-semibold text-titleBlack block mb-0.5">
              Active Status
            </label>
            <p className="text-[13px] font-medium text-gray-500">Is this product visible?</p>
          </div>
          <Controller
            name="isActive"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Switch checked={value} onCheckedChange={onChange} />
            )}
          />
        </div>

        {isPreOwnedCategory && (
          <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100 mt-5">
            <div>
              <label className="text-sm font-semibold text-titleBlack block mb-0.5">
                Featured Product
              </label>
              <p className="text-[13px] font-medium text-gray-500">
                Show this product on the home page?
              </p>
            </div>
            <Controller
              name="isFeatured"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Switch checked={value} onCheckedChange={onChange} />
              )}
            />
          </div>
        )}

        <div className="mt-5">
          <label className="block text-sm font-semibold text-titleBlack mb-1.5">Category</label>
          <Controller
            name="categoryId"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Select
                  onValueChange={(val) => onChange(val === "none" ? "" : val)}
                  value={value ? value.toString() : undefined}
                >
                  <SelectTrigger
                    className={cn(
                      "w-full h-11 bg-gray-50 border-gray-100",
                      error && "border-red-500 focus:ring-red-500",
                    )}
                  >
                    <SelectValue placeholder="Select a category">
                      {value && value !== "none"
                        ? categories.find((c) => c.id.toString() === value?.toString())?.name
                        : "Select a category"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none" className="text-gray-500 italic">
                      None (Clear Selection)
                    </SelectItem>
                    {activeCategories.length === 0 ? (
                      <div className="p-2 text-sm text-gray-500 text-center">
                        No categories found
                      </div>
                    ) : (
                      activeCategories.map((c) => (
                        <SelectItem key={c.id} value={c.id.toString()} label={c.name}>
                          {c.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                {error && <p className="text-red-500 text-xs mt-1.5">{error.message}</p>}
              </>
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-titleBlack mb-1.5">Brand</label>
          <Controller
            name="brandId"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Select
                  onValueChange={(val) => onChange(val === "none" ? "" : val)}
                  value={value ? value.toString() : undefined}
                >
                  <SelectTrigger
                    className={cn(
                      "w-full h-11 bg-gray-50 border-gray-100",
                      error && "border-red-500 focus:ring-red-500",
                    )}
                  >
                    <SelectValue placeholder="Select a brand">
                      {value && value !== "none"
                        ? brands.find((b) => b.id.toString() === value?.toString())?.name
                        : "Select a brand"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none" className="text-gray-500 italic">
                      None (Clear Selection)
                    </SelectItem>
                    {activeBrands.length === 0 ? (
                      <div className="p-2 text-sm text-gray-500 text-center">No brands found</div>
                    ) : (
                      activeBrands.map((b) => (
                        <SelectItem key={b.id} value={b.id.toString()} label={b.name}>
                          {b.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                {error && <p className="text-red-500 text-xs mt-1.5">{error.message}</p>}
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
}
