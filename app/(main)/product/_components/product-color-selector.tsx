"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

const colors = [
  { id: 1, name: "red", class: "bg-red-800", ringClass: "ring-red-800" },
  {
    id: 2,
    name: "yellow",
    class: "bg-yellow-500",
    ringClass: "ring-yellow-500",
  },
  { id: 3, name: "green", class: "bg-green-800", ringClass: "ring-green-800" },
  {
    id: 4,
    name: "purple",
    class: "bg-purple-700",
    ringClass: "ring-purple-700",
  },
];

export function ProductColorSelector() {
  const [selectedColorId, setSelectedColorId] = useState(colors[0].id);

  return (
    <div>
      <p className="text-[#605F5F] text-sm font-semibold">Color</p>
      <div className="flex items-center gap-2 mt-2">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => setSelectedColorId(color.id)}
            className={cn(
              "w-6 h-6 rounded-full p-1 cursor-pointer",
              color.class,
              selectedColorId === color.id &&
                `ring-2 ring-offset-2 ${color.ringClass}`,
            )}
            aria-label={`Select ${color.name} color`}
          />
        ))}
      </div>
    </div>
  );
}
