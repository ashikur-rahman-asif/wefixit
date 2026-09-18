import { ProductColor, Product } from "@/features/products/types/product.types";
import { ProductColorSelector } from "./product-color-selector";
import { ProductActions } from "./product-actions";
import { ProductInfo } from "./product-info";

interface ProductInteractiveProps {
  product: Product;
  selectedColor?: ProductColor;
  onColorChange?: (color: ProductColor) => void;
}

export function ProductInteractive({ product, selectedColor, onColorChange }: ProductInteractiveProps) {

  return (
    <div>
      <ProductInfo product={product} />
      <ProductColorSelector
        colors={product.colors}
        onColorChange={onColorChange || (() => {})}
      />
      <ProductActions
        product={product}
        isOutOfStock={product.stock === 0}
        selectedColor={selectedColor}
      />
    </div>
  );
}
