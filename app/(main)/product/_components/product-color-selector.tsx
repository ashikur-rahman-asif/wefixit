"use client";

import { cn } from "@/lib/utils";
import { ProductColor } from "@/types/product";
import { useState } from "react";

interface ProductColorSelectorProps {
  colors?: ProductColor[];
}

export function ProductColorSelector({
  colors = [],
}: ProductColorSelectorProps) {
  const [selectedColorId, setSelectedColorId] = useState(colors?.[0]?.id);

  const handleColorSelect = (colorId: string | number, index: number) => {
    setSelectedColorId(colorId);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("product-image-change", { detail: index }),
      );
    }
  };

  if (!colors || colors.length === 0) return null;

  return (
    <div>
      <p className="text-[#605F5F] text-lg font-semibold">Color</p>
      <div className="flex flex-wrap items-center gap-2 mt-3">
        {colors.map((color, index) => (
          <button
            key={color.id}
            onClick={() => handleColorSelect(color.id, index)}
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
