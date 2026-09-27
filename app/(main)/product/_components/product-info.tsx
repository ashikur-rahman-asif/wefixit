import { LabelIcon } from "@/components/icons/label-icon";
import { StarRating } from "@/components/ui/star-rating";
import { calculateDiscountPercentage } from "@/lib/utils";
import { Product } from "@/features/products/types/product.types";

interface ProductInfoProps {
  product: Product;
  displayPrice?: number;
  displayDiscountPrice?: number | null;
}

export function ProductInfo({ product, displayPrice, displayDiscountPrice }: ProductInfoProps) {
  const effectivePrice = displayPrice ?? product.price;
  const effectiveDiscountPrice =
    displayDiscountPrice !== undefined ? displayDiscountPrice : product.discountPrice;
  return (
    <>
      <h1 className="text-2xl md:text-[28px] font-bold text-primary leading-tight">
        {product.title}
      </h1>
      {product.shortDescription && (
        <p className="mt-3 text-sm md:text-base font-sans text-secondary">
          {product.shortDescription}
        </p>
      )}

      <div className="flex items-center gap-2 my-3">
        <StarRating
          rating={product.reviewsCount && product.reviewsCount > 0 ? product.rating || 0 : 0}
        />
        <p className="text-secondary text-sm md:text-lg font-medium font-sans">
          {product.reviewsCount && product.reviewsCount > 0
            ? `${product.reviewsCount} Reviews`
            : "0 Review"}
        </p>
      </div>

      <div className="flex items-center gap-3 my-3">
        <p className="text-brand font-bold text-2xl md:text-[28px]">
          ${effectiveDiscountPrice || effectivePrice}
        </p>
        {effectiveDiscountPrice && (
          <del className="text-primary font-medium text-base md:text-lg">${effectivePrice}</del>
        )}
      </div>

      {effectiveDiscountPrice && (
        <div className="flex items-center gap-2 my-3">
          <LabelIcon className="w-4 h-4 shrink-0" />
          <p className="text-primary text-sm md:text-base font-medium font-sans">
            Save{" "}
            <span className="font-bold">
              {calculateDiscountPercentage(effectivePrice, effectiveDiscountPrice)}
            </span>
            % right now!
          </p>
        </div>
      )}
    </>
  );
}
