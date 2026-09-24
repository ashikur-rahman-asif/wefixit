"use client";

import { useEffect, useRef } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { AdminColor } from "@/types/admin";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { colorSchema, type ColorFormData } from "@/features/colors/schemas/color.schema";
import { Switch } from "@/components/ui/switch";
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
    defaultValues: editingColor
      ? {
          name: editingColor.name,
          hex: editingColor.hex,
          isActive: editingColor.isActive,
        }
      : {
          name: "",
          hex: "#000000",
          isActive: true,
        },
  });

  const hexValue = useWatch({ control, name: "hex" });
  const colorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (colorInputRef.current && hexValue && colorInputRef.current.value !== hexValue) {
      colorInputRef.current.value = hexValue;
    }
  }, [hexValue]);

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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-1 h-full overflow-hidden"
        >
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
                  ref={colorInputRef}
                  defaultValue={hexValue || "#000000"}
                  onChange={(e) =>
                    setValue("hex", e.target.value, { shouldValidate: true, shouldDirty: true })
                  }
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
              {isSubmitting ? "Saving..." : editingColor ? "Save Changes" : "Add Color"}
            </button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
