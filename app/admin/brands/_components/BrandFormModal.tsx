"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { AdminBrand } from "@/types/admin";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Image from "next/image";

export type BrandFormData = {
  name: string;
  slug: string;
  deviceName: string;
  icon: FileList | null;
  is_active: boolean;
};

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
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<BrandFormData>({
    defaultValues: {
      name: "",
      slug: "",
      deviceName: "",
      is_active: true,
      icon: null,
    },
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const iconFile = watch("icon");

  useEffect(() => {
    if (iconFile && iconFile.length > 0) {
      const file = iconFile[0];
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [iconFile]);

  // Reset form when modal opens/closes or editingBrand changes
  useEffect(() => {
    if (open) {
      if (editingBrand) {
        reset({
          name: editingBrand.name,
          slug: editingBrand.slug,
          deviceName: editingBrand.device_name || "",
          is_active: editingBrand.is_active,
          icon: null,
        });
        setPreviewUrl(editingBrand.icon);
      } else {
        reset({
          name: "",
          slug: "",
          deviceName: "",
          is_active: true,
          icon: null,
        });
        setPreviewUrl(null);
      }
    }
  }, [open, editingBrand, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-110 p-0 overflow-hidden bg-white rounded-2xl border-none shadow-xl">
        <div className="p-6 border-b border-gray-100">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-titleBlack">
              {editingBrand ? "Edit Brand" : "Add Brand"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {editingBrand ? "Form to edit a brand." : "Form to add a new brand."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-4 pb-4 space-y-5 pt-2">
          <div>
            <label className="block text-sm font-semibold text-titleBlack mb-2">
              Brand Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Brand name is required" })}
              placeholder="e.g., Apple"
              className={`w-full h-11 px-4 rounded-xl border ${
                errors.name ? "border-red-500" : "border-gray-200"
              } text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors`}
              autoFocus
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-titleBlack mb-2">
              Device Name Label{" "}
              <span className="text-textGray font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              {...register("deviceName")}
              placeholder="e.g., iPhone"
              className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
            />
            <p className="text-xs text-textGray mt-1.5">
              Used in the frontend (e.g., &quot;Select your iPhone model&quot;).
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-titleBlack mb-2">
              Brand Icon{" "}
              <span className="text-textGray font-normal">(Optional)</span>
            </label>
            <div className="flex items-center gap-4">
              {previewUrl && (
                <div className="w-16 h-16 rounded-xl border border-gray-200 overflow-hidden flex items-center justify-center bg-gray-50 shrink-0">
                  <Image src={previewUrl} alt="Preview" width={48} height={48} className="object-contain" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                {...register("icon")}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand/10 file:text-brand hover:file:bg-brand/20 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-titleBlack mb-2">
              Slug{" "}
              <span className="text-textGray font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              {...register("slug")}
              placeholder="e.g., apple (leave blank to auto-generate)"
              className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
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
                Active brands are visible to customers
              </p>
            </div>
          </div>

          <DialogFooter className="bg-white border-t border-gray-100 p-4 sm:p-6 flex gap-3 sm:space-x-0 mt-4">
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
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
