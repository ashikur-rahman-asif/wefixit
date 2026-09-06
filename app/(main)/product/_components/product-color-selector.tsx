"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { ProductColor } from "@/types/product";

interface ProductColorSelectorProps {
  colors?: ProductColor[];
}

export function ProductColorSelector({ colors = [] }: ProductColorSelectorProps) {
  const [selectedColorId, setSelectedColorId] = useState(colors?.[0]?.id);

  if (!colors || colors.length === 0) return null;

  return (
    <div>
      <p className="text-[#605F5F] text-sm font-semibold">Color</p>
      <div className="flex items-center gap-2 mt-2">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => setSelectedColorId(color.id)}
            style={color.hexCode ? { backgroundColor: color.hexCode } : undefined}
            className={cn(
              "w-6 h-6 rounded-full p-1 cursor-pointer",
              color.class,
              selectedColorId === color.id &&
                (color.ringClass ? `ring-2 ring-offset-2 ${color.ringClass}` : "ring-2 ring-offset-2 ring-brand")
            )}
            aria-label={`Select ${color.name} color`}
          />
        ))}
      </div>
    </div>
  );
}
