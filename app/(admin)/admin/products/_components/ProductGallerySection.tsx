"use client";

import { Controller, Control, FieldErrors } from "react-hook-form";
import { MultiImageUpload } from "@/components/ui/multi-image-upload";
import { ProductFormInput } from "@/features/products/schemas/product.schema";

interface ProductGallerySectionProps {
  control: Control<ProductFormInput>;
  errors: FieldErrors<ProductFormInput>;
}

export function ProductGallerySection({ control, errors }: ProductGallerySectionProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-titleBlack">Product Gallery</h2>
        <p className="text-[13px] font-medium text-gray-500 mt-1">Recommended size: 640 x 640 px</p>
      </div>
      <div>
        <Controller
          name="images"
          control={control}
          render={({ field: { onChange, value } }) => (
            <MultiImageUpload value={value} onChange={onChange} maxSizeKB={2000} />
          )}
        />
        {errors.images && (
          <p className="text-red-500 text-xs mt-1.5">{errors.images.message?.toString()}</p>
        )}
      </div>
    </div>
  );
}
