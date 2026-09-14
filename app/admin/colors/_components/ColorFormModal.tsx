"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { AdminColor } from "@/types/admin";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export type ColorFormData = {
  name: string;
  hex: string;
  is_active: boolean;
};

interface ColorFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingColor: AdminColor | null;
  onSubmit: (data: ColorFormData) => void;
  isSubmitting: boolean;
}

export function ColorFormModal({
  open,
  onOpenChange,
  editingColor,
  onSubmit,
  isSubmitting,
}: ColorFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ColorFormData>({
    defaultValues: {
      name: "",
      hex: "#000000",
      is_active: true,
    },
  });

  const hexValue = watch("hex");

  // Reset form when modal opens/closes or editingColor changes
  useEffect(() => {
    if (open) {
      if (editingColor) {
        reset({
          name: editingColor.name,
          hex: editingColor.hex,
          is_active: editingColor.is_active,
        });
      } else {
        reset({
          name: "",
          hex: "#000000",
          is_active: true,
        });
      }
    }
  }, [open, editingColor, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-110 p-0 overflow-hidden bg-white rounded-2xl border-none shadow-xl">
        <div className="p-6 border-b border-gray-100">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-titleBlack">
              {editingColor ? "Edit Color" : "Add Color"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {editingColor ? "Form to edit a color." : "Form to add a new color."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-4 pb-4 space-y-5 pt-2">
          <div>
            <label className="block text-sm font-semibold text-titleBlack mb-2">
              Color Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Color name is required" })}
              placeholder="e.g., Midnight Black"
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
              Hex Code <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              <div className="w-11 h-11 rounded-xl border border-gray-200 overflow-hidden shrink-0">
                <input
                  type="color"
                  value={hexValue || "#000000"}
                  onChange={(e) => setValue("hex", e.target.value)}
                  className="w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                />
              </div>
              <input
                type="text"
                {...register("hex", { 
                  required: "Hex code is required",
                  pattern: {
                    value: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,
                    message: "Invalid hex code (e.g. #000000)"
                  }
                })}
                placeholder="#000000"
                className={`w-full h-11 px-4 rounded-xl border ${
                  errors.hex ? "border-red-500" : "border-gray-200"
                } text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors`}
              />
            </div>
            {errors.hex && (
              <p className="text-red-500 text-xs mt-1.5">{errors.hex.message}</p>
            )}
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
                Active colors are visible to customers
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
                : editingColor
                  ? "Save Changes"
                  : "Add Color"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
