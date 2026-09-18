"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { AdminColor } from "@/types/admin";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { colorSchema, type ColorFormData } from "@/validators/admin";
import { Input } from "@/components/form-elements/input";

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
    control,
    setValue,
    formState: { errors },
  } = useForm<ColorFormData>({
    resolver: zodResolver(colorSchema),
    values: open ? (editingColor ? {
      name: editingColor.name,
      hex: editingColor.hex,
      is_active: editingColor.is_active,
    } : {
      name: "",
      hex: "#000000",
      is_active: true,
    }) : undefined,
    defaultValues: {
      name: "",
      hex: "#000000",
      is_active: true,
    },
  });

  const hexValue = useWatch({ control, name: "hex" });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md p-0 bg-white border-none shadow-xl flex flex-col h-full">
        <div className="p-6 border-b border-gray-100">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold text-titleBlack">
              {editingColor ? "Edit Color" : "Add Color"}
            </SheetTitle>
            <SheetDescription className="sr-only">
              {editingColor ? "Form to edit a color." : "Form to add a new color."}
            </SheetDescription>
          </SheetHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 h-full overflow-hidden">
          <div className="px-4 pb-4 space-y-5 pt-2 flex-1 overflow-y-auto">
          <div>
            <Input
              label="Color Name"
              required
              type="text"
              {...register("name")}
              placeholder="e.g., Midnight Black"
              error={errors.name?.message?.toString()}
              autoFocus
            />
          </div>

          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-xl border border-gray-200 overflow-hidden shrink-0">
              <input
                type="color"
                value={hexValue || "#000000"}
                onChange={(e) => setValue("hex", e.target.value)}
                className="w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <Input
                label="Hex Code"
                required
                type="text"
                {...register("hex")}
                placeholder="#000000"
                error={errors.hex?.message?.toString()}
              />
            </div>
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
                : editingColor
                  ? "Save Changes"
                  : "Add Color"}
            </button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
