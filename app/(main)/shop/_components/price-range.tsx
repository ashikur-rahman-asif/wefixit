"use client";

import { Slider } from "@/components/ui/slider";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function PriceRange({ maxRange = 5000 }: { maxRange?: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramMin = searchParams.get("minPrice");
  const paramMax = searchParams.get("maxPrice");
  const initialMin = paramMin ? Math.max(Number(paramMin), 0) : 0;
  const initialMax = paramMax ? Math.min(Number(paramMax), maxRange) : maxRange;
  
  const [price, setPrice] = useState([initialMin, initialMax]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const currentMin = searchParams.get("minPrice");
      const currentMax = searchParams.get("maxPrice");
      
      const newMin = price[0].toString();
      const newMax = price[1].toString();

      if (currentMin !== newMin || currentMax !== newMax) {
        if (newMin === "0" && newMax === maxRange.toString()) {
          params.delete("minPrice");
          params.delete("maxPrice");
        } else {
          params.set("minPrice", newMin);
          params.set("maxPrice", newMax);
        }
        router.push(`?${params.toString()}`, { scroll: false });
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [price, router, searchParams, maxRange]);

  return (
    <div className="pt-4 space-y-4">
      <Slider
        defaultValue={[initialMin, initialMax]}
        max={maxRange}
        step={50}
        value={price}
        onValueChange={(val) => setPrice(val as number[])}
      />
      <div className="flex items-center justify-between text-sm text-[#5b5a5a] font-medium">
        <span>$ {price[0]}</span>
        <span>$ {price[1]}</span>
      </div>
    </div>
  );
}
