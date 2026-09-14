"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { ProductGrade } from "@/types/admin";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export type GradeFormData = {
  name: string;
  description: string;
  is_active: boolean;
};

interface GradeFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingGrade: ProductGrade | null;
  onSubmit: (data: GradeFormData) => void;
  isSubmitting: boolean;
}

export function GradeFormModal({
  open,
  onOpenChange,
  editingGrade,
  onSubmit,
  isSubmitting,
}: GradeFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GradeFormData>({
    defaultValues: {
      name: "",
      description: "",
      is_active: true,
    },
  });

  // Reset form when modal opens/closes or editingGrade changes
  useEffect(() => {
    if (open) {
      if (editingGrade) {
        reset({
          name: editingGrade.name,
          description: editingGrade.description || "",
          is_active: editingGrade.is_active,
        });
      } else {
        reset({
          name: "",
          description: "",
          is_active: true,
        });
      }
    }
  }, [open, editingGrade, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-110 p-0 overflow-hidden bg-white rounded-2xl border-none shadow-xl">
        <div className="p-6 border-b border-gray-100">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-titleBlack">
              {editingGrade ? "Edit Product Grade" : "Add Product Grade"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {editingGrade ? "Form to edit a product grade." : "Form to add a new product grade."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-titleBlack mb-2">
              Grade Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Grade name is required" })}
              placeholder="e.g., Grade A"
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
              Description{" "}
              <span className="text-textGray font-normal">(Optional)</span>
            </label>
            <textarea
              {...register("description")}
              placeholder="Describe what this grade means..."
              className="w-full min-h-24 p-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand resize-none transition-colors"
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
                Active grades are visible when assigning to products
              </p>
            </div>
          </div>

          <DialogFooter className="pt-2">
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
                : editingGrade
                  ? "Save Changes"
                  : "Add Grade"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
