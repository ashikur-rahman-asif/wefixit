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

  const isSameImage = (url1?: string | null, url2?: string | null) => {
    if (!url1 || !url2) return false;
    if (url1 === url2) return true;
    try {
      const f1 = new URL(url1, "http://localhost").pathname.split("/").pop();
      const f2 = new URL(url2, "http://localhost").pathname.split("/").pop();
      return f1 && f2 && f1 === f2;
    } catch {
      return url1.split("/").pop() === url2.split("/").pop();
    }
  };

  const allImages = useMemo(() => {
    const allColorImages =
      product.colors?.flatMap((color) =>
        color.images?.length ? color.images : color.image ? [color.image] : [],
      ) || [];

    if (allColorImages.length > 0) {
      return Array.from(new Set(allColorImages)).filter(Boolean);
    }

    const globalImages = product.images?.length
      ? product.images
      : product.image
        ? [product.image]
        : [];

    return Array.from(new Set(globalImages)).filter(Boolean);
  }, [product]);

  const targetImage = selectedColor?.images?.[0] || selectedColor?.image;

  const handleImageChange = (imageStr: string) => {
    const matchedColor = product.colors?.find(
      (c) => c.images?.some((img) => isSameImage(img, imageStr)) || isSameImage(c.image, imageStr),
    );
    if (matchedColor) {
      setSelectedColor(matchedColor);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
      <div className="md:sticky md:top-24 md:self-start z-10">
        <ProductImageGallery
          images={allImages}
          thumbnails={allImages}
          discountPercentage={discountPercentage}
          selectedImage={targetImage}
          onImageChange={handleImageChange}
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
