"use client";

import { cn } from "@/lib/utils";
import { ProductColor } from "@/features/products/types/product.types";
import { useState } from "react";

interface ProductColorSelectorProps {
  colors?: ProductColor[];
  onColorChange?: (color: ProductColor) => void;
}

export function ProductColorSelector({ colors = [], onColorChange }: ProductColorSelectorProps) {
  const validColors = colors.filter((c) => c.image || (c.images && c.images.length > 0));

  const [selectedColorId, setSelectedColorId] = useState(validColors?.[0]?.id);

  const handleColorSelect = (color: ProductColor) => {
    setSelectedColorId(color.id);
    onColorChange?.(color);
  };

  if (validColors.length <= 1) return null;

  return (
    <div>
      <p className="text-[#605F5F] text-lg font-semibold">
        Color:{" "}
        <span className="text-black font-medium">
          {validColors.find((c) => c.id === selectedColorId)?.name}
        </span>
      </p>
      <div className="flex flex-wrap items-center gap-2 mt-3">
        {validColors.map((color) => (
          <button
            key={color.id}
            onClick={() => handleColorSelect(color)}
            style={{
              backgroundColor: color.hex,
              outlineColor: selectedColorId === color.id ? color.hex : "transparent",
            }}
            className={cn(
              "w-6 h-6 rounded-full p-1 cursor-pointer transition-all",
              "outline-2 outline-offset-2",
            )}
            aria-label={`Select ${color.name} color`}
          />
        ))}
      </div>
    </div>
  );
}
