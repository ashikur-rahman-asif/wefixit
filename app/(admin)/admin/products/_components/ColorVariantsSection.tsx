"use client";

import {
  useFieldArray,
  Controller,
  UseFormRegister,
  Control,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
  FieldError,
} from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/form-elements/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorPickerField } from "@/components/form-elements/color-picker";
import { ProductFormInput } from "@/features/products/schemas/product.schema";
import { MultiImageUpload } from "@/components/ui/multi-image-upload";

interface ColorVariantsSectionProps {
  register: UseFormRegister<ProductFormInput>;
  control: Control<ProductFormInput>;
  setValue: UseFormSetValue<ProductFormInput>;
  watch: UseFormWatch<ProductFormInput>;
  errors: FieldErrors<ProductFormInput>;
  globalColors: { id?: number | string; name: string; hex: string; isActive?: boolean }[];
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

  const colorsError = errors.colors as (FieldError & { root?: FieldError }) | undefined;
  const errorMessage = colorsError?.root?.message || colorsError?.message;

  const currentColors = watch("colors") || [];

  const handleAddColor = () => {
    if (currentColors.length > 0) {
      const lastColor = currentColors[currentColors.length - 1];
      if (!lastColor.name || !lastColor.hex) {
        toast.error("Please provide a name for the current color variant before adding a new one.");
        return;
      }
    }

    appendColor({
      name: "",
      hex: "#000000",
      stock: 0,
      position: colorFields.length,
      image: null,
      images: [],
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 mt-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-titleBlack">Color Variants</h2>
        <button
          type="button"
          onClick={handleAddColor}
          className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 text-titleBlack rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Color
        </button>
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm font-semibold text-red-600">{errorMessage.toString()}</p>
        </div>
      )}

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
                    value={watch(`colors.${index}.name`) || undefined}
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
                      {(() => {
                        const activeGlobalColors = globalColors.filter(
                          (c) => c.isActive !== false || c.name === watch(`colors.${index}.name`),
                        );
                        return activeGlobalColors.length === 0 ? (
                          <div className="p-2 text-sm text-gray-500 text-center">
                            No active colors found
                          </div>
                        ) : (
                          activeGlobalColors.map((c) => (
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
                        );
                      })()}
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
                  Color Images
                </label>
                <p className="text-[13px] font-medium text-gray-500 mb-2">
                  Upload images specifically for this color variant. The first image will be the
                  primary image for this color.
                </p>
                <Controller
                  name={`colors.${index}.images` as const}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <MultiImageUpload value={value} onChange={onChange} maxSizeKB={2000} />
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

          <div className="flex justify-center mt-2 border-t border-dashed border-gray-200 pt-6">
            <button
              type="button"
              onClick={handleAddColor}
              className="flex items-center gap-2 px-6 py-2.5 bg-gray-50 border border-gray-200 text-titleBlack rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Another Color
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
