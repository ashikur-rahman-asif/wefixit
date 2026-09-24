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
import { AdminProductBrand } from "@/types/admin";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ecommerceBrandSchema,
  type EcommerceBrandFormData,
} from "@/features/products/schemas/product.schema";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/form-elements/input";

interface ProductBrandFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingBrand: AdminProductBrand | null;
  onSubmit: (data: EcommerceBrandFormData) => void;
  isSubmitting: boolean;
}

export function ProductBrandFormModal({
  open,
  onOpenChange,
  editingBrand,
  onSubmit,
  isSubmitting,
}: ProductBrandFormModalProps) {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EcommerceBrandFormData>({
    resolver: zodResolver(ecommerceBrandSchema),
    defaultValues: editingBrand
      ? {
          name: editingBrand.name,
          slug: editingBrand.slug,
          isActive: editingBrand.isActive,
        }
      : {
          name: "",
          slug: "",
          isActive: true,
        },
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md p-0 bg-white border-none shadow-xl flex flex-col h-full">
        <div className="p-6 border-b border-gray-100">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold text-titleBlack">
              {editingBrand ? "Edit Product Brand" : "Add Product Brand"}
            </SheetTitle>
            <SheetDescription className="sr-only">
              {editingBrand ? "Form to edit a product brand." : "Form to add a new product brand."}
            </SheetDescription>
          </SheetHeader>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-1 h-full overflow-hidden"
        >
          <div className="px-4 pb-4 space-y-5 pt-2 flex-1 overflow-y-auto">
            <div>
              <Input
                label="Brand Name"
                required
                type="text"
                {...register("name", {
                  onChange: (e) => {
                    const generatedSlug = slugify(e.target.value, {
                      lower: true,
                      strict: true,
                      trim: true,
                    });
                    setValue("slug", generatedSlug, { shouldValidate: true });
                  },
                })}
                placeholder="e.g., Apple"
                error={errors.name?.message?.toString()}
                autoFocus
              />
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
                name="isActive"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Switch checked={value} onCheckedChange={onChange} />
                )}
              />
              <div>
                <label
                  htmlFor="isActive"
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
              {isSubmitting ? "Saving..." : editingBrand ? "Save Changes" : "Add Brand"}
            </button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
