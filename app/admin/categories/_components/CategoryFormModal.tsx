"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { AdminCategory } from "@/types/admin";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export type CategoryFormData = {
  name: string;
  slug: string;
  is_active: boolean;
};

interface CategoryFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingCategory: AdminCategory | null;
  onSubmit: (data: CategoryFormData) => void;
  isSubmitting: boolean;
}

export function CategoryFormModal({
  open,
  onOpenChange,
  editingCategory,
  onSubmit,
  isSubmitting,
}: CategoryFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: {
      name: "",
      slug: "",
      is_active: true,
    },
  });

  // Reset form when modal opens/closes or editingCategory changes
  useEffect(() => {
    if (open) {
      if (editingCategory) {
        reset({
          name: editingCategory.name,
          slug: editingCategory.slug,
          is_active: editingCategory.is_active,
        });
      } else {
        reset({
          name: "",
          slug: "",
          is_active: true,
        });
      }
    }
  }, [open, editingCategory, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-110 p-0 overflow-hidden bg-white rounded-2xl border-none shadow-xl">
        <div className="p-6 border-b border-gray-100">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-titleBlack">
              {editingCategory ? "Edit Category" : "Add Category"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {editingCategory ? "Form to edit a category." : "Form to add a new category."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-4 pb-4 space-y-5 pt-2">
          <div>
            <label className="block text-sm font-semibold text-titleBlack mb-2">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Category name is required" })}
              placeholder="e.g., Screen Protectors"
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
              Slug{" "}
              <span className="text-textGray font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              {...register("slug")}
              placeholder="e.g., screen-protectors (leave blank to auto-generate)"
              className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
            />
            <p className="text-xs text-textGray mt-1.5">
              URL-friendly identifier. Auto-generated from name if left empty.
            </p>
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
                Active categories are visible to customers
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
                : editingCategory
                  ? "Save Changes"
                  : "Add Category"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
