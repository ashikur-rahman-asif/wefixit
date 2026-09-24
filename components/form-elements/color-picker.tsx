import React, { useEffect, useRef } from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
  FieldError,
} from "react-hook-form";
import { Input } from "./input";

interface ColorPickerProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  errors: FieldErrors<T>;
}

export function ColorPickerField<T extends FieldValues>({
  name,
  label = "Hex Code",
  register,
  setValue,
  watch,
  errors,
}: ColorPickerProps<T>) {
  const hexValue = watch(name);
  const colorRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (colorRef.current && hexValue && colorRef.current.value !== hexValue) {
      colorRef.current.value = String(hexValue);
    }
  }, [hexValue]);

  const getErrorMessage = (errorsObj: FieldErrors<T>, path: string): string | undefined => {
    const errorNode = path.split(".").reduce<unknown>((acc, part) => {
      if (acc && typeof acc === "object" && part in acc) {
        return (acc as Record<string, unknown>)[part];
      }
      return undefined;
    }, errorsObj);

    if (errorNode && typeof errorNode === "object" && "message" in errorNode) {
      return (errorNode as FieldError).message;
    }
    return undefined;
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-titleBlack mb-1.5">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          ref={colorRef}
          defaultValue={typeof hexValue === "string" ? hexValue : "#000000"}
          onChange={(e) =>
            setValue(name, e.target.value as PathValue<T, Path<T>>, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          className="w-11 h-11 rounded-lg cursor-pointer border border-gray-200 p-1 bg-white"
        />
        <Input
          required
          {...register(name)}
          placeholder="#000000"
          error={getErrorMessage(errors, name)}
        />
      </div>
    </div>
  );
}
