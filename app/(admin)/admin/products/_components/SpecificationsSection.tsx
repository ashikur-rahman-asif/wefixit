"use client";

import { useFieldArray, UseFormRegister, Control, FieldErrors } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/form-elements/input";
import { ProductFormInput } from "@/features/products/schemas/product.schema";

interface SpecificationsSectionProps {
  register: UseFormRegister<ProductFormInput>;
  control: Control<ProductFormInput>;
  errors: FieldErrors<ProductFormInput>;
}

export function SpecificationsSection({ register, control, errors }: SpecificationsSectionProps) {
  const {
    fields: specFields,
    append: appendSpec,
    remove: removeSpec,
  } = useFieldArray({
    control,
    name: "specifications",
  });

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-titleBlack mb-0">Specifications</h2>
        <button
          type="button"
          onClick={() => appendSpec({ key: "", value: "" })}
          className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 text-titleBlack rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Specification
        </button>
      </div>

      {specFields.length === 0 ? (
        <div className="text-center py-8 text-textGray text-sm">
          No specifications added yet. Click &quot;Add Specification&quot; to add one.
        </div>
      ) : (
        <div className="space-y-4">
          {specFields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-start gap-4 p-4 bg-gray-50/50 rounded-xl border border-gray-200 relative group"
            >
              <div className="flex-1 space-y-4 md:space-y-0 md:flex md:gap-4 md:items-start">
                <div className="w-full md:w-1/3">
                  <Input
                    required
                    placeholder="e.g. Memory"
                    {...register(`specifications.${index}.key` as const)}
                    error={errors.specifications?.[index]?.key?.message?.toString()}
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <Input
                    required
                    placeholder="e.g. 8GB DDR4 RAM"
                    {...register(`specifications.${index}.value` as const)}
                    error={errors.specifications?.[index]?.value?.message?.toString()}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeSpec(index)}
                className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer mt-0.5"
                title="Remove"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
