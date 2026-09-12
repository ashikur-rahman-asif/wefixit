"use client";

import { cn } from "@/lib/utils";
import { ProductColor } from "@/types/product";
import { useState } from "react";

interface ProductColorSelectorProps {
  colors?: ProductColor[];
  onColorChange?: (color: ProductColor) => void;
}

export function ProductColorSelector({
  colors = [],
  onColorChange,
}: ProductColorSelectorProps) {
  const [selectedColorId, setSelectedColorId] = useState(colors?.[0]?.id);

  const handleColorSelect = (color: ProductColor, index: number) => {
    setSelectedColorId(color.id);
    onColorChange?.(color);
    window.dispatchEvent(new CustomEvent("product-image-change", { detail: index }));
  };

  if (!colors || colors.length === 0) return null;

  return (
    <div>
      <p className="text-[#605F5F] text-lg font-semibold">
        Color: <span className="text-black font-medium">{colors.find((c) => c.id === selectedColorId)?.name}</span>
      </p>
      <div className="flex flex-wrap items-center gap-2 mt-3">
        {colors.map((color, index) => (
          <button
            key={color.id}
            onClick={() => handleColorSelect(color, index)}
            style={{
              backgroundColor: color.hex,
              outlineColor:
                selectedColorId === color.id ? color.hex : "transparent",
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
