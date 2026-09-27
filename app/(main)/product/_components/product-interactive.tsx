import { ProductColor, Product } from "@/features/products/types/product.types";
import { ProductColorSelector } from "./product-color-selector";
import { ProductActions } from "./product-actions";
import { ProductInfo } from "./product-info";

interface ProductInteractiveProps {
  product: Product;
  selectedColor?: ProductColor;
  onColorChange?: (color: ProductColor) => void;
}

export function ProductInteractive({
  product,
  selectedColor,
  onColorChange,
}: ProductInteractiveProps) {
  const isOutOfStock =
    product.colors && product.colors.length > 0
      ? Number(selectedColor?.stock || 0) === 0
      : Number(product.stock || 0) === 0;

  const displayPrice = selectedColor?.price != null ? selectedColor.price : product.price;
  const displayDiscountPrice =
    selectedColor?.price != null ? (selectedColor.discountPrice ?? null) : product.discountPrice;

  return (
    <div>
      <ProductInfo
        product={product}
        displayPrice={displayPrice}
        displayDiscountPrice={displayDiscountPrice}
      />
      <ProductColorSelector
        colors={product.colors}
        selectedColor={selectedColor}
        onColorChange={onColorChange || (() => {})}
      />
      <ProductActions product={product} isOutOfStock={isOutOfStock} selectedColor={selectedColor} />
    </div>
  );
}
