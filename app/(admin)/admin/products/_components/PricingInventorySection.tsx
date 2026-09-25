"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Input } from "@/components/form-elements/input";
import { ProductFormInput } from "@/features/products/schemas/product.schema";

interface PricingInventorySectionProps {
  register: UseFormRegister<ProductFormInput>;
  errors: FieldErrors<ProductFormInput>;
  hasColorFields: boolean;
  totalCalculatedStock: number;
}

export function PricingInventorySection({
  register,
  errors,
  hasColorFields,
  totalCalculatedStock,
}: PricingInventorySectionProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-6">
      <h2 className="text-xl font-bold text-titleBlack">Pricing & Inventory</h2>

      <div className="space-y-4">
        <Input
          label="Price ($)"
          required
          type="number"
          step="0.01"
          {...register("price")}
          error={errors.price?.message?.toString()}
        />
        <Input
          label="Discount Price ($)"
          type="number"
          step="0.01"
          {...register("discountPrice")}
          error={errors.discountPrice?.message?.toString()}
        />
        <Input
          label="Stock Quantity"
          required
          type="number"
          disabled={hasColorFields}
          {...register("stock")}
          {...(hasColorFields ? { value: totalCalculatedStock, readOnly: true } : {})}
          error={errors.stock?.message?.toString()}
        />
        {hasColorFields && (
          <p className="text-[13px] font-medium text-gray-500 mt-1">
            Stock is auto-calculated from color variants.
          </p>
        )}
      </div>
    </div>
  );
}
