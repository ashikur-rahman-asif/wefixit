"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export function ProductQuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex items-center justify-between w-[70%] bg-[#F5F5F5] rounded-full px-4 py-2 mt-8">
      <button
        onClick={decrement}
        className="text-[#605F5F] hover:text-black transition-colors disabled:opacity-50 cursor-pointer"
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4" strokeWidth={2.5} />
      </button>
      <span className="text-black font-semibold text-base">{quantity}</span>
      <button
        onClick={increment}
        className="text-[#605F5F] hover:text-black transition-colors cursor-pointer"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}
