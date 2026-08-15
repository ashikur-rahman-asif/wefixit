"use client";

import { ProductCard, type ProductCardProps } from "@/components/product-card";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

function ProductCardSkeleton() {
  return (
    <div className="relative p-6 bg-lightBrand border border-black/5 rounded-[14px] flex flex-col items-center text-center h-full justify-between min-h-[320px]">
      <div className="absolute top-4 left-4 w-14 h-5 bg-black/5 rounded-full animate-pulse" />

      <div className="w-full flex justify-center items-center mb-6 min-h-40">
        <div className="w-40 h-36 bg-black/5 rounded-xl animate-pulse" />
      </div>

      <div className="w-full flex flex-col items-center flex-1 gap-2">
        <div className="w-3/4 h-4 bg-black/5 rounded-full animate-pulse" />
        <div className="w-1/2 h-4 bg-black/5 rounded-full animate-pulse" />

        <div className="flex items-center gap-3 mt-auto pt-6 pb-2">
          <div className="w-20 h-8 bg-black/5 rounded-full animate-pulse" />
          <div className="w-14 h-5 bg-black/5 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

interface PreOwnedGridProps {
  products: ProductCardProps[];
  skeletonCount?: number;
}

export function PreOwnedGrid({
  products,
  skeletonCount = 8,
}: PreOwnedGridProps) {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const gridClass =
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6";

  if (!mounted) {
    return (
      <div className={gridClass}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={gridClass}>
      {products.map((product) => (
        <ProductCard
          key={product.title}
          image={product.image}
          title={product.title}
          price={product.price}
          discountPrice={product.discountPrice}
          href={product.href}
        />
      ))}
    </div>
  );
}
