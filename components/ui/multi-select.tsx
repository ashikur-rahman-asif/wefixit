"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

interface Option {
  label: string;
  value: number | string;
}

interface MultiSelectProps {
  options: Option[];
  value: (number | string)[];
  onChange: (value: (number | string)[]) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  error?: string;
  required?: boolean;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select options...",
  className,
  label,
  error,
  required,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("pointerdown", handleOutsideClick, true);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("pointerdown", handleOutsideClick, true);
    };
  }, [isOpen]);

  const handleToggle = (optionValue: number | string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const selectedLabels = options
    .filter((opt) => value.includes(opt.value))
    .map((opt) => opt.label)
    .join(", ");

  return (
    <div className={cn("flex flex-col", className)} ref={containerRef}>
      {label && (
        <label className="block text-base font-medium mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <div
          className={cn(
            "flex min-h-12 w-full items-center justify-between rounded-lg border bg-transparent px-3 py-2 text-sm ring-offset-background cursor-pointer transition duration-200",
            error ? "border-red-500" : "border-gray-200 hover:border-brand",
            isOpen && "ring-[1.8px] ring-brand/50 border-brand"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={cn("truncate", !selectedLabels && "text-muted-foreground opacity-60")}>
            {selectedLabels || placeholder}
          </span>
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </div>

        {isOpen && (
          <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white py-1 shadow-md">
            {options.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">No options found.</div>
            ) : (
              options.map((option) => {
                const isSelected = value.includes(option.value);
                return (
                  <div
                    key={option.value}
                    className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none hover:bg-gray-100"
                    onClick={() => handleToggle(option.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        isSelected ? "opacity-100 text-brand" : "opacity-0"
                      )}
                    />
                    <span>{option.label}</span>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
    </div>
  );
}
