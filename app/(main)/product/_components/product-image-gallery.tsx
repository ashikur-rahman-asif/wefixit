"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface ProductImageGalleryProps {
  images?: string[];
  thumbnails?: string[];
  discountPercentage?: number;
  selectedImage?: string;
}

export function ProductImageGallery({
  images = [],
  thumbnails = [],
  discountPercentage = 0,
  selectedImage,
}: ProductImageGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [prevSelectedImage, setPrevSelectedImage] = useState(selectedImage);

  const displayImages = images.length > 0 ? images : ["/HP_Lptp.webp"];

  if (selectedImage && selectedImage !== prevSelectedImage) {
    const newIndex = displayImages.indexOf(selectedImage);
    if (newIndex !== -1 && newIndex !== activeImageIndex) {
      setActiveImageIndex(newIndex);
    }
    setPrevSelectedImage(selectedImage);
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div
        className="relative w-full overflow-hidden border border-gray-100 rounded-lg bg-lightBrand"
        style={{ aspectRatio: "1 / 1" }}
      >
        {discountPercentage > 0 && (
          <div className="absolute top-4 left-4 z-20 bg-gold text-titleBlack text-sm font-bold px-3 py-1 rounded-full shadow-sm">
            {discountPercentage}% OFF
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
                  : "translate-x-full z-0",
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

      {thumbnails.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:gap-4 h-20 sm:h-24">
          {thumbnails.map((img, index) => {
            const activeThumbnailIndex = displayImages.indexOf(img);
            return (
              <button
                key={index}
                onClick={() => {
                  if (activeThumbnailIndex !== -1) {
                    setActiveImageIndex(activeThumbnailIndex);
                  }
                }}
                className={cn(
                  "relative w-full h-full border rounded-lg overflow-hidden bg-lightBrand transition-all duration-300 flex items-center justify-center p-2 cursor-pointer",
                  activeImageIndex === activeThumbnailIndex
                    ? "border-brand opacity-100"
                    : "border-transparent ",
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
            );
          })}
        </div>
      )}
    </div>
  );
}
