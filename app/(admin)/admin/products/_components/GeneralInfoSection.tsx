"use client";

import { UseFormRegister, Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import { Controller } from "react-hook-form";
import slugify from "slugify";
import { Input } from "@/components/form-elements/input";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/form-elements/rich-text-editor";
import { ProductFormInput } from "@/features/products/schemas/product.schema";
import { AdminProduct } from "@/types/admin";

interface GeneralInfoSectionProps {
  register: UseFormRegister<ProductFormInput>;
  control: Control<ProductFormInput>;
  errors: FieldErrors<ProductFormInput>;
  setValue: UseFormSetValue<ProductFormInput>;
  initialData?: AdminProduct;
}

export function GeneralInfoSection({
  register,
  control,
  errors,
  setValue,
  initialData,
}: GeneralInfoSectionProps) {
  return (
    <>
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 space-y-6">
        <h2 className="text-xl font-bold text-titleBlack mb-6">General Information</h2>

        <div className="space-y-5">
          <Input
            label="Product Title"
            required
            type="text"
            {...register("title", {
              onChange: (e) => {
                if (!initialData) {
                  const generatedSlug = slugify(e.target.value, {
                    lower: true,
                    strict: true,
                    trim: true,
                  });
                  setValue("slug", generatedSlug, { shouldValidate: true });
                }
              },
            })}
            placeholder="e.g., iPhone 15 Pro Max"
            error={errors.title?.message?.toString()}
          />

          <Input
            label="Slug (URL)"
            type="text"
            {...register("slug")}
            placeholder="iphone-15-pro-max"
            error={errors.slug?.message?.toString()}
          />

          <div>
            <label className="block text-sm font-semibold text-titleBlack mb-1.5">
              Short Description
            </label>
            <Textarea
              {...register("shortDescription")}
              placeholder="Brief summary of the product..."
              className="min-h-[120px] resize-y"
            />
            {errors.shortDescription && (
              <p className="text-red-500 text-xs mt-1.5">
                {errors.shortDescription.message?.toString()}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 space-y-6">
        <h2 className="text-xl font-bold text-titleBlack mb-6">Detailed Description</h2>
        <div>
          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value } }) => (
              <RichTextEditor
                value={value || ""}
                onChange={onChange}
                placeholder="Write a detailed product description here..."
              />
            )}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1.5">{errors.description.message?.toString()}</p>
          )}
        </div>
      </div>
    </>
  );
}
