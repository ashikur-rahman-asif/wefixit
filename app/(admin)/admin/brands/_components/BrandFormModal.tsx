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
import { AdminBrand } from "@/types/admin";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { brandSchema, type BrandFormData } from "@/validators/admin";
import { ImageUpload } from "@/components/ui/image-upload";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/form-elements/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { useDevices } from "@/features/devices/hooks/use-admin-devices";

interface BrandFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingBrand: AdminBrand | null;
  onSubmit: (data: BrandFormData) => void;
  isSubmitting: boolean;
}

export function BrandFormModal({
  open,
  onOpenChange,
  editingBrand,
  onSubmit,
  isSubmitting,
}: BrandFormModalProps) {
  const { data: devicesData } = useDevices();
  const devices = devicesData?.data || [];

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<BrandFormData>({
    resolver: zodResolver(brandSchema),
    values: open ? (editingBrand ? {
      name: editingBrand.name,
      slug: editingBrand.slug,
      deviceName: editingBrand.device_name || "",
      deviceIds: (editingBrand.deviceIds || []).map(Number),
      is_active: editingBrand.is_active,
      icon: editingBrand.icon,
    } : {
      name: "",
      slug: "",
      deviceName: "",
      deviceIds: [],
      is_active: true,
      icon: null,
    }) : undefined,
    defaultValues: {
      name: "",
      slug: "",
      deviceName: "",
      deviceIds: [],
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
              {editingBrand ? "Edit Brand" : "Add Brand"}
            </SheetTitle>
            <SheetDescription className="sr-only">
              {editingBrand ? "Form to edit a brand." : "Form to add a new brand."}
            </SheetDescription>
          </SheetHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 h-full overflow-hidden">
          <div className="px-4 pb-4 space-y-5 pt-2 flex-1 overflow-y-auto">
          <div>
            <Input
              label="Brand Name"
              required
              type="text"
              {...register("name", {
                onChange: (e) => {
                    const generatedSlug = slugify(e.target.value, { lower: true, strict: true, trim: true });
                    setValue("slug", generatedSlug, { shouldValidate: true });
                  }
              })}
              placeholder="e.g., Apple"
              error={errors.name?.message?.toString()}
              autoFocus
            />
          </div>

          <div>
            <Controller
              name="deviceIds"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  label="Available on Devices"
                  options={devices.map((d) => ({ label: d.name, value: d.id }))}
                  value={field.value || []}
                  onChange={field.onChange}
                  placeholder="Select devices..."
                  error={errors.deviceIds?.message?.toString()}
                  required
                />
              )}
            />
          </div>

          <div>
            <label className="block text-base font-medium mb-1.5">
              Brand Icon <span className="text-red-500 ml-1">*</span>
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
              placeholder="e.g., apple (leave blank to auto-generate)"
              error={errors.slug?.message?.toString()}
            />
          </div>

          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
            <Controller
              name="is_active"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Switch checked={value} onCheckedChange={onChange} />
              )}
            />
            <div>
              <label
                htmlFor="is_active"
                className="text-sm font-semibold text-titleBlack cursor-pointer"
              >
                Active
              </label>
              <p className="text-[13px] font-medium text-gray-500">
                Active brands are visible to customers
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
                : editingBrand
                  ? "Save Changes"
                  : "Add Brand"}
            </button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
