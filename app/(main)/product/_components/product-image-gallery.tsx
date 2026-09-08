"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ProductImageGalleryProps {
  images?: string[];
  discountPercentage?: number;
}

export function ProductImageGallery({ 
  images = [], 
  discountPercentage = 0,
}: ProductImageGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const handleImageChange = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      setActiveImageIndex(customEvent.detail);
    };

    window.addEventListener("product-image-change", handleImageChange);
    return () => window.removeEventListener("product-image-change", handleImageChange);
  }, []);
  
  const displayImages = images.length > 0 ? images : ["/HP_Lptp.webp"];

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="relative w-full overflow-hidden border border-gray-100 rounded-lg bg-lightBrand" style={{ aspectRatio: '1 / 1' }}>
        {discountPercentage > 0 && (
          <div className="absolute top-4 left-4 z-20 bg-brand text-white text-sm font-bold px-3 py-1 rounded-full shadow-sm">
            -{discountPercentage}%
          </div>
        )}
        {displayImages.map((img, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 flex items-center justify-center p-4 transition-transform duration-500 ease-in-out",
              activeImageIndex === index
                ? "translate-x-0 z-10"
                : index < activeImageIndex
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

      <div className="grid grid-cols-4 gap-3 sm:gap-4 h-20 sm:h-24">
        {displayImages.slice(0, 4).map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImageIndex(index)}
            className={cn(
              "relative w-full h-full border rounded-lg overflow-hidden bg-lightBrand transition-all duration-300 flex items-center justify-center p-2 cursor-pointer",
              activeImageIndex === index
                ? "border-brand opacity-100"
                : "border-transparent "
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
