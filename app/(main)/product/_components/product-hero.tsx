"use client";

import { Product, ProductColor } from "@/features/products/types/product.types";
import { useState, useMemo } from "react";
import { ProductImageGallery } from "./product-image-gallery";
import { ProductInteractive } from "./product-interactive";

interface ProductHeroProps {
  product: Product;
  discountPercentage: number;
}

export function ProductHero({ product, discountPercentage }: ProductHeroProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(product.colors?.[0]);

  const allImages = useMemo(() => {
    const globalImages = product.images?.length
      ? product.images
      : product.image
        ? [product.image]
        : [];

    const allColorImages =
      product.colors?.flatMap((color) =>
        color.images?.length ? color.images : color.image ? [color.image] : [],
      ) || [];

    return Array.from(new Set([...globalImages, ...allColorImages])).filter(Boolean);
  }, [product]);

  const targetImage = selectedColor?.images?.[0] || selectedColor?.image;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
      <div className="md:sticky md:top-24 md:self-start z-10">
        <ProductImageGallery
          images={allImages}
          thumbnails={allImages}
          discountPercentage={discountPercentage}
          selectedImage={targetImage}
        />
      </div>
      <div>
        <ProductInteractive
          product={product}
          selectedColor={selectedColor}
          onColorChange={setSelectedColor}
        />
      </div>
    </div>
  );
}
