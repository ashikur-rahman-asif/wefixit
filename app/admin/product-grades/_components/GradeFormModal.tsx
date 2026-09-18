"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { ProductGrade } from "@/types/admin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gradeSchema, type GradeFormData } from "@/validators/admin";
import { Input } from "@/components/form-elements/input";

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
    formState: { errors },
  } = useForm<GradeFormData>({
    resolver: zodResolver(gradeSchema),
    values: open ? (editingGrade ? {
      name: editingGrade.name,
      description: editingGrade.description || "",
      is_active: editingGrade.is_active,
    } : {
      name: "",
      description: "",
      is_active: true,
    }) : undefined,
    defaultValues: {
      name: "",
      description: "",
      is_active: true,
    },
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md p-0 bg-white border-none shadow-xl flex flex-col h-full">
        <div className="p-6 border-b border-gray-100">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold text-titleBlack">
              {editingGrade ? "Edit Product Grade" : "Add Product Grade"}
            </SheetTitle>
            <SheetDescription className="sr-only">
              {editingGrade ? "Form to edit a product grade." : "Form to add a new product grade."}
            </SheetDescription>
          </SheetHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 h-full overflow-hidden">
          <div className="px-4 pb-4 space-y-5 pt-2 flex-1 overflow-y-auto">
          <div>
            <Input
              label="Grade Name"
              required
              type="text"
              {...register("name")}
              placeholder="e.g., Grade A"
              error={errors.name?.message?.toString()}
              autoFocus
            />
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
                : editingGrade
                  ? "Save Changes"
                  : "Add Grade"}
            </button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
