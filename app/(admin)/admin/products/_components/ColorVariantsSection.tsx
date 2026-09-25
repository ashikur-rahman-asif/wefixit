"use client";

import {
  useFieldArray,
  Controller,
  useWatch,
  UseFormRegister,
  Control,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/form-elements/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorPickerField } from "@/components/form-elements/color-picker";
import { cn } from "@/lib/utils";
import { ProductFormInput } from "@/features/products/schemas/product.schema";

interface ColorVariantsSectionProps {
  register: UseFormRegister<ProductFormInput>;
  control: Control<ProductFormInput>;
  setValue: UseFormSetValue<ProductFormInput>;
  watch: UseFormWatch<ProductFormInput>;
  errors: FieldErrors<ProductFormInput>;
  globalColors: { id?: number | string; name: string; hex: string }[];
}

export function ColorVariantsSection({
  register,
  control,
  setValue,
  watch,
  errors,
  globalColors,
}: ColorVariantsSectionProps) {
  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({
    control,
    name: "colors",
  });

  const watchedImages = useWatch({
    control,
    name: "images",
  });

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 mt-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-titleBlack">Color Variants</h2>
        <button
          type="button"
          onClick={() =>
            appendColor({
              name: "",
              hex: "#000000",
              stock: 0,
              position: colorFields.length,
              image: null,
              images: [],
            })
          }
          className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 text-titleBlack rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Color
        </button>
      </div>

      {colorFields.length === 0 ? (
        <div className="text-center py-8 text-textGray text-sm">
          No color variants added yet. Click &quot;Add Color&quot; to add one.
        </div>
      ) : (
        <div className="space-y-6">
          {colorFields.map((field, index) => (
            <div
              key={field.id}
              className="p-6 bg-gray-50/50 rounded-xl border border-gray-200 relative group"
            >
              <button
                type="button"
                onClick={() => removeColor(index)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                title="Remove Color"
              >
                <Trash2 className="w-5 h-5" />
              </button>

              <h3 className="font-semibold text-titleBlack mb-4">Color {index + 1}</h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="md:col-span-4 mb-2">
                  <label className="block text-sm font-semibold text-titleBlack mb-1.5">
                    Select Existing Color (Optional)
                  </label>
                  <Select
                    onValueChange={(val: string | null) => {
                      const selectedColor = globalColors.find((c) => c.name === val);
                      if (selectedColor) {
                        setValue(`colors.${index}.name`, selectedColor.name);
                        setValue(`colors.${index}.hex`, selectedColor.hex);
                      }
                    }}
                  >
                    <SelectTrigger className="w-full md:w-1/2 h-11 bg-gray-50 border-gray-100">
                      <SelectValue placeholder="Choose a color to auto-fill" />
                    </SelectTrigger>
                    <SelectContent>
                      {globalColors.length === 0 ? (
                        <div className="p-2 text-sm text-gray-500 text-center">No colors found</div>
                      ) : (
                        globalColors.map((c) => (
                          <SelectItem key={c.id} value={c.name} label={c.name}>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 rounded-full border border-gray-200"
                                style={{ backgroundColor: c.hex }}
                              />
                              <span>{c.name}</span>
                            </div>
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <Input
                  label="Color Name"
                  required
                  {...register(`colors.${index}.name` as const)}
                  placeholder="e.g. Midnight Black"
                  error={errors.colors?.[index]?.name?.message?.toString()}
                />
                <ColorPickerField
                  name={`colors.${index}.hex`}
                  register={register}
                  setValue={setValue}
                  watch={watch}
                  errors={errors}
                />

                <Input
                  label="Stock"
                  required
                  type="number"
                  {...register(`colors.${index}.stock` as const)}
                  error={errors.colors?.[index]?.stock?.message?.toString()}
                />
                <Input
                  label="Position"
                  type="number"
                  {...register(`colors.${index}.position` as const)}
                  error={errors.colors?.[index]?.position?.message?.toString()}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-titleBlack mb-0.5">
                  Assign Images to this Color (Select from Gallery)
                </label>
                <p className="text-[13px] font-medium text-gray-500 mb-2">
                  Click on the images from the product gallery below to assign them to this variant.
                  The first selected image will be the primary image for this color.
                </p>
                <Controller
                  name={`colors.${index}.images` as const}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <div className="flex flex-wrap gap-3">
                      {watchedImages && watchedImages.length > 0 ? (
                        watchedImages.map((img: File | string, imgIdx: number) => {
                          const isSelected = (value || []).includes(img);
                          return (
                            <div
                              key={imgIdx}
                              onClick={() => {
                                const currentVal = value || [];
                                if (isSelected) {
                                  onChange(currentVal.filter((i: File | string) => i !== img));
                                } else {
                                  onChange([...currentVal, img]);
                                }
                              }}
                              className={cn(
                                "w-24 h-24 rounded-lg border-2 cursor-pointer overflow-hidden transition-all",
                                isSelected
                                  ? "border-brand ring-2 ring-brand ring-offset-2"
                                  : "border-gray-200 opacity-60 hover:opacity-100",
                              )}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={img instanceof File ? URL.createObjectURL(img) : img}
                                alt="Gallery item"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-sm text-gray-500 p-4 bg-gray-100 rounded-lg w-full text-center">
                          Please upload images to the Product Gallery first.
                        </div>
                      )}
                    </div>
                  )}
                />
              </div>
              {errors.colors?.[index]?.images && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.colors?.[index]?.images?.message?.toString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
