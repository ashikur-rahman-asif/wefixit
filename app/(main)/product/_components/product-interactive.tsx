"use client";

import { ProductColor, Product } from "@/types/product";
import { useState } from "react";
import { ProductColorSelector } from "./product-color-selector";
import { ProductActions } from "./product-actions";
import { ProductInfo } from "./product-info";

interface ProductInteractiveProps {
  product: Product;
}

export function ProductInteractive({ product }: ProductInteractiveProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(
    product.colors?.[0],
  );

  return (
    <div>
      <ProductInfo product={product} />
      <ProductColorSelector
        colors={product.colors}
        onColorChange={setSelectedColor}
      />
      <ProductActions
        product={product}
        isOutOfStock={product.stock === 0}
        selectedColor={selectedColor}
      />
    </div>
  );
}
