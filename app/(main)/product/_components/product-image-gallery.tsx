"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProductImageGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    "/HP_Lptp.webp",
    "/HP_Lptp.webp",
    "/HP_Lptp.webp",
    "/HP_Lptp.webp",
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Image Container */}
      <div className="relative w-full overflow-hidden border border-gray-100 rounded-lg bg-lightBrand" style={{ aspectRatio: '1 / 1' }}>
        {images.map((img, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 flex items-center justify-center p-4 transition-transform duration-500 ease-in-out",
              activeIndex === index
                ? "translate-x-0 z-10"
                : index < activeIndex
                ? "-translate-x-full z-0"
                : "translate-x-full z-0"
            )}
          >
            <Image
              src={img}
              alt={`Product Image ${index + 1}`}
              width={448}
              height={436}
              className="w-full h-full object-contain"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3 sm:gap-4 h-20 sm:h-24">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "relative w-full h-full border rounded-lg overflow-hidden bg-lightBrand transition-all duration-300 flex items-center justify-center p-2 cursor-pointer",
              activeIndex === index
                ? "border-brand opacity-100"
                : "border-transparent opacity-50 hover:opacity-100"
            )}
            aria-label={`View image ${index + 1}`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index + 1}`}
              width={100}
              height={100}
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
