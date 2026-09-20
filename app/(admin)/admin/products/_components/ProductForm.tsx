"use client";

import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import slugify from "slugify";
import { useRouter } from "next/navigation";

import { productSchema, type ProductFormData } from "@/validators/admin";
import { AdminProduct } from "@/types/admin";
import { Input } from "@/components/form-elements/input";
import { MultiImageUpload } from "@/components/ui/multi-image-upload";
import { ImageUpload } from "@/components/ui/image-upload";
import { RichTextEditor } from "@/components/form-elements/rich-text-editor";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProductCategories } from "@/features/products/hooks/use-admin-product-categories";
import { useProductBrands } from "@/features/products/hooks/use-admin-product-brands";
import { useProductDevices } from "@/features/products/hooks/use-admin-product-devices";
import { useColors } from "@/features/colors/hooks/use-admin-colors";
import { Textarea } from "@/components/ui/textarea";

interface ProductFormProps {
  initialData?: AdminProduct;
  onSubmit: (data: ProductFormData) => void;
  isSubmitting: boolean;
}

export function ProductForm({
  initialData,
  onSubmit,
  isSubmitting,
}: ProductFormProps) {
  const router = useRouter();
  
  const { data: categoriesResponse } = useProductCategories({ per_page: 100 });
  const { data: brandsResponse } = useProductBrands({ per_page: 100 });
  const { data: devicesResponse } = useProductDevices({ per_page: 100 });
  const { data: colorsResponse } = useColors();

  const categories = categoriesResponse?.data || [];
  const brands = brandsResponse?.data || [];
  const devices = devicesResponse?.data || [];
  const globalColors = colorsResponse?.data || [];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    values: initialData ? {
      title: initialData.title || "",
      slug: initialData.slug || "",
      price: initialData.price != null ? Number(initialData.price) : 0,
      discountPrice: initialData.discount_price != null ? Number(initialData.discount_price) : undefined,
      stock: initialData.stock != null ? Number(initialData.stock) : 0,
      isActive: initialData.is_active,
      categoryId: initialData.product_category_id != null ? Number(initialData.product_category_id) : "",
      brandId: initialData.product_brand_id != null ? Number(initialData.product_brand_id) : "",
      deviceId: initialData.product_device_id != null ? Number(initialData.product_device_id) : "",
      shortDescription: initialData.short_description || "",
      description: initialData.description || "",
      specification: initialData.specification || "",
      specifications: initialData.specifications || [],
      image: initialData.image || null,
      images: initialData.images || [],
      colors: initialData.colors || [],
    } : undefined,
    defaultValues: {
      title: "",
      slug: "",
      price: 0,
      discountPrice: undefined,
      stock: 0,
      isActive: true,
      categoryId: "",
      brandId: "",
      deviceId: "",
      shortDescription: "",
      description: "",
      specification: "",
      specifications: [],
      image: null,
      images: [],
      colors: [],
    },
  });

  const { fields: colorFields, append: appendColor, remove: removeColor } = useFieldArray({
    control,
    name: "colors",
  });

  const { fields: specFields, append: appendSpec, remove: removeSpec } = useFieldArray({
    control,
    name: "specifications",
  });

  const watchedColors = useWatch({
    control,
    name: "colors",
  });

  const totalCalculatedStock = watchedColors?.reduce((sum, color) => sum + (Number(color.stock) || 0), 0) || 0;

  const onSubmitHandler = (data: ProductFormData) => {
    if (data.colors && data.colors.length > 0) {
      data.stock = data.colors.reduce((sum, color) => sum + (Number(color.stock) || 0), 0);
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full relative pb-28 space-y-6 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
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
                      const generatedSlug = slugify(e.target.value, { lower: true, strict: true, trim: true });
                      setValue("slug", generatedSlug, { shouldValidate: true });
                    }
                  }
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
                  <p className="text-red-500 text-xs mt-1.5">{errors.shortDescription.message?.toString()}</p>
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

          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-titleBlack mb-0">Specifications</h2>
              <button
                type="button"
                onClick={() => appendSpec({ key: "", value: "" })}
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 text-titleBlack rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Specification
              </button>
            </div>
            
            {specFields.length === 0 ? (
              <div className="text-center py-8 text-textGray text-sm">
                No specifications added yet. Click &quot;Add Specification&quot; to add one.
              </div>
            ) : (
              <div className="space-y-4">
                {specFields.map((field, index) => (
                  <div key={field.id} className="flex items-start gap-4 p-4 bg-gray-50/50 rounded-xl border border-gray-200 relative group">
                    <div className="flex-1 space-y-4 md:space-y-0 md:flex md:gap-4 md:items-start">
                      <div className="w-full md:w-1/3">
                        <Input
                          required
                          placeholder="e.g. Memory"
                          {...register(`specifications.${index}.key` as const)}
                          error={errors.specifications?.[index]?.key?.message?.toString()}
                        />
                      </div>
                      <div className="w-full md:w-2/3">
                        <Input
                          required
                          placeholder="e.g. 8GB DDR4 RAM"
                          {...register(`specifications.${index}.value` as const)}
                          error={errors.specifications?.[index]?.value?.message?.toString()}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSpec(index)}
                      className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer mt-0.5"
                      title="Remove"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-6">
            <h2 className="text-xl font-bold text-titleBlack">Status & Organization</h2>
            
            <div className="space-y-5">
              <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                <div>
                  <label className="text-sm font-semibold text-titleBlack block mb-0.5">Active Status</label>
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

              <div>
                <label className="block text-sm font-semibold text-titleBlack mb-1.5">Category</label>
                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select onValueChange={onChange} value={value?.toString()}>
                      <SelectTrigger className="w-full h-11 bg-gray-50 border-gray-100">
                        <SelectValue placeholder="Select a category" />
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
                        <SelectValue placeholder="Select a brand" />
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

              <div>
                <label className="block text-sm font-semibold text-titleBlack mb-1.5">Device</label>
                <Controller
                  name="deviceId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select onValueChange={onChange} value={value?.toString()}>
                      <SelectTrigger className="w-full h-11 bg-gray-50 border-gray-100">
                        <SelectValue placeholder="Select a device" />
                      </SelectTrigger>
                      <SelectContent>
                        {devices.length === 0 ? (
                          <div className="p-2 text-sm text-gray-500 text-center">No devices found</div>
                        ) : (
                          devices.map((d) => (
                            <SelectItem key={d.id} value={d.id.toString()} label={d.name}>
                              {d.name}
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
                disabled={colorFields.length > 0}
                {...register("stock")}
                {...(colorFields.length > 0 ? { value: totalCalculatedStock, readOnly: true } : {})}
                error={errors.stock?.message?.toString()}
              />
              {colorFields.length > 0 && (
                <p className="text-[13px] font-medium text-gray-500 mt-1">
                  Stock is auto-calculated from color variants.
                </p>
              )}
            </div>
          </div>

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
                  <MultiImageUpload 
                    value={value} 
                    onChange={onChange} 
                    maxSizeKB={2000}
                  />
                )}
              />
              {errors.images && (
                <p className="text-red-500 text-xs mt-1.5">{errors.images.message?.toString()}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 mt-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-titleBlack">Color Variants</h2>
          <button
            type="button"
            onClick={() => appendColor({ name: "", hex: "#000000", stock: 0, position: colorFields.length, image: null, images: [] })}
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
              <div key={field.id} className="p-6 bg-gray-50/50 rounded-xl border border-gray-200 relative group">
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
                    <label className="block text-sm font-semibold text-titleBlack mb-1.5">Select Existing Color (Optional)</label>
                    <Select
                      onValueChange={(val: string | null) => {
                        const selectedColor = globalColors.find(c => c.id.toString() === val);
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
                          globalColors.map(c => (
                            <SelectItem key={c.id} value={c.id.toString()} label={c.name}>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: c.hex }} />
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
                  <div>
                    <label className="block text-sm font-semibold text-titleBlack mb-1.5">Hex Code</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        {...register(`colors.${index}.hex` as const)}
                        className="w-11 h-11 rounded-lg cursor-pointer border border-gray-200 p-1 bg-white"
                      />
                      <Input
                        required
                        {...register(`colors.${index}.hex` as const)}
                        placeholder="#000000"
                        error={errors.colors?.[index]?.hex?.message?.toString()}
                      />
                    </div>
                  </div>
                  
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
                    <label className="block text-sm font-semibold text-titleBlack mb-0.5">Color Image (Optional)</label>
                    <p className="text-[13px] font-medium text-gray-500 mb-2">Recommended size: 640 x 640 px</p>
                    <Controller
                      name={`colors.${index}.image` as const}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <ImageUpload
                          value={value}
                          onChange={onChange}
                          className="w-full md:w-50"
                        />
                      )}
                    />
                  </div>
                  {errors.colors?.[index]?.image && (
                    <p className="text-red-500 text-xs mt-1.5">{errors.colors?.[index]?.image?.message?.toString()}</p>
                  )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 lg:left-[280px] right-0 bg-white flex items-center justify-end gap-4 py-4 px-6 md:px-10 border-t border-gray-100 z-50 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="h-11 px-8 bg-gray-50 text-titleBlack rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 px-8 bg-brand text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting
            ? "Saving..."
            : initialData
              ? "Save Changes"
              : "Add Product"}
        </button>
      </div>
    </form>
  );
}
