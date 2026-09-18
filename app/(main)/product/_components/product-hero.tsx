"use client";

import { Product, ProductColor } from "@/features/products/types/product.types";
import { useState } from "react";
import { ProductImageGallery } from "./product-image-gallery";
import { ProductInteractive } from "./product-interactive";

interface ProductHeroProps {
  product: Product;
  discountPercentage: number;
}

export function ProductHero({ product, discountPercentage }: ProductHeroProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(
    product.colors?.[0]
  );

  const colorImages = selectedColor?.images || (selectedColor?.image ? [selectedColor.image] : []);
  const globalImages = product.images || (product.image ? [product.image] : []);
  const combinedImages = [...colorImages, ...globalImages].filter(Boolean).slice(0, 4);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
      <div className="md:sticky md:top-24 md:self-start z-10">
        <ProductImageGallery
          key={selectedColor?.id || 'default'}
          images={combinedImages}
          discountPercentage={discountPercentage}
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
