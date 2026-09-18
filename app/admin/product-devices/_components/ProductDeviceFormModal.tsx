"use client";

import slugify from "slugify";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { AdminProductDevice } from "@/types/admin";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ecommerceDeviceSchema, type EcommerceDeviceFormData } from "@/validators/admin";
import { ImageUpload } from "@/components/ui/image-upload";
import { Input } from "@/components/form-elements/input";

interface ProductDeviceFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingDevice: AdminProductDevice | null;
  onSubmit: (data: EcommerceDeviceFormData) => void;
  isSubmitting: boolean;
}

export function ProductDeviceFormModal({
  open,
  onOpenChange,
  editingDevice,
  onSubmit,
  isSubmitting,
}: ProductDeviceFormModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<EcommerceDeviceFormData>({
    resolver: zodResolver(ecommerceDeviceSchema),
    values: open ? (editingDevice ? {
      name: editingDevice.name,
      slug: editingDevice.slug,
      is_active: editingDevice.is_active,
      icon: editingDevice.icon,
    } : {
      name: "",
      slug: "",
      is_active: true,
      icon: null,
    }) : undefined,
    defaultValues: {
      name: "",
      slug: "",
      is_active: true,
      icon: null,
    },
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md p-0 bg-white border-none shadow-xl flex flex-col h-full">
        <div className="p-6 border-b border-gray-100">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold text-titleBlack">
              {editingDevice ? "Edit Product Device" : "Add Product Device"}
            </SheetTitle>
            <SheetDescription className="sr-only">
              {editingDevice ? "Form to edit a product device." : "Form to add a new product device."}
            </SheetDescription>
          </SheetHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 h-full overflow-hidden">
          <div className="px-4 pb-4 space-y-5 pt-2 flex-1 overflow-y-auto">
            <div>
              <Input
                label="Device Name"
                required
                type="text"
                {...register("name", {
                  onChange: (e) => {
                    const generatedSlug = slugify(e.target.value, { lower: true, strict: true, trim: true });
                    setValue("slug", generatedSlug, { shouldValidate: true });
                  }
                })}
                placeholder="e.g., iPhone"
                error={errors.name?.message?.toString()}
                autoFocus
              />
            </div>

            <div>
              <label className="block text-base font-medium mb-1.5">
                Device Icon
              </label>
              <Controller
                name="icon"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <ImageUpload 
                    value={value} 
                    onChange={onChange} 
                    maxSizeKB={50}
                    maxDimensions={{ width: 150, height: 150 }}
                  />
                )}
              />
              {errors.icon && (
                <p className="text-red-500 text-xs mt-1.5">{errors.icon.message?.toString()}</p>
              )}
            </div>

            <div>
              <Input
                label="Slug (Optional)"
                type="text"
                {...register("slug")}
                placeholder="e.g., iphone (leave blank to auto-generate)"
                error={errors.slug?.message?.toString()}
              />
            </div>

            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
              <input
                type="checkbox"
                id="is_active"
                {...register("is_active")}
                className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand cursor-pointer"
              />
              <div>
                <label
                  htmlFor="is_active"
                  className="text-sm font-semibold text-titleBlack cursor-pointer"
                >
                  Active
                </label>
                <p className="text-xs text-textGray">
                  Active devices are visible to customers
                </p>
              </div>
            </div>
          </div>
          <SheetFooter className="bg-white border-t border-gray-100 p-4 sm:p-6 flex flex-row justify-end gap-3 sm:space-x-0 mt-auto shrink-0">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-11 bg-gray-50 text-titleBlack rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-11 bg-brand text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting
                ? "Saving..."
                : editingDevice
                  ? "Save Changes"
                  : "Add Device"}
            </button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
