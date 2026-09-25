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

interface StatusOrganizationSectionProps {
  control: Control<ProductFormInput>;
  categories: { id: number | string; name: string }[];
  brands: { id: number | string; name: string }[];
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
            render={({ field: { onChange, value } }) => (
              <Select onValueChange={onChange} value={value?.toString()}>
                <SelectTrigger className="w-full h-11 bg-gray-50 border-gray-100">
                  <SelectValue placeholder="Select a category">
                    {value
                      ? categories.find((c) => c.id.toString() === value?.toString())?.name
                      : "Select a category"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {categories.length === 0 ? (
                    <div className="p-2 text-sm text-gray-500 text-center">No categories found</div>
                  ) : (
                    categories.map((c) => (
                      <SelectItem key={c.id} value={c.id.toString()} label={c.name}>
                        {c.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-titleBlack mb-1.5">Brand</label>
          <Controller
            name="brandId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select onValueChange={onChange} value={value?.toString()}>
                <SelectTrigger className="w-full h-11 bg-gray-50 border-gray-100">
                  <SelectValue placeholder="Select a brand">
                    {value
                      ? brands.find((b) => b.id.toString() === value?.toString())?.name
                      : "Select a brand"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {brands.length === 0 ? (
                    <div className="p-2 text-sm text-gray-500 text-center">No brands found</div>
                  ) : (
                    brands.map((b) => (
                      <SelectItem key={b.id} value={b.id.toString()} label={b.name}>
                        {b.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
    </div>
  );
}
