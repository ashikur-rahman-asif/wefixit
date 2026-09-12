"use client";

import { Slider } from "@/components/ui/slider";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef } from "react";

export function PriceRange({ maxRange = 5000 }: { maxRange?: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramMin = searchParams.get("minPrice");
  const paramMax = searchParams.get("maxPrice");
  const initialMin = paramMin ? Math.max(Number(paramMin), 0) : 0;
  const initialMax = paramMax ? Math.min(Number(paramMax), maxRange) : maxRange;

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback(
    (value: number | readonly number[]) => {
      const val = Array.isArray(value) ? value : [value as number];
      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (val[0] === 0 && val[1] === maxRange) {
          params.delete("minPrice");
          params.delete("maxPrice");
        } else {
          params.set("minPrice", String(val[0]));
          params.set("maxPrice", String(val[1]));
        }
        router.push(`?${params.toString()}`, { scroll: false });
      }, 400);
    },
    [searchParams, router, maxRange],
  );

  return (
    <div className="pt-4 space-y-4">
      <Slider
        defaultValue={[initialMin, initialMax]}
        max={maxRange}
        step={50}
        onValueChange={handleChange}
      />
      <div className="flex items-center justify-between text-sm text-[#5b5a5a] font-medium">
        <span>$ {initialMin}</span>
        <span>$ {initialMax}</span>
      </div>
    </div>
  );
}
