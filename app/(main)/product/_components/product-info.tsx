import { LabelIcon } from "@/components/icons/label-icon";
import { StarRating } from "@/components/ui/star-rating";
import { calculateDiscountPercentage } from "@/lib/utils";
import { Product } from "@/types/product";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
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
        <StarRating rating={product.rating || 0} />
        <p className="text-secondary text-sm md:text-lg font-medium font-sans">
          {product.reviewsCount || 0} Reviews
        </p>
      </div>

      <div className="flex items-center gap-3 my-3">
        <p className="text-brand font-bold text-2xl md:text-[28px]">${product.discountPrice || product.price}</p>
        {product.discountPrice && (
          <del className="text-primary font-medium text-base md:text-lg">
            ${product.price}
          </del>
        )}
      </div>
      
      {product.discountPrice && (
        <div className="flex items-center gap-2 my-3">
          <LabelIcon className="w-4 h-4 shrink-0" />
          <p className="text-primary text-sm md:text-base font-medium font-sans">
            Save <span className="font-bold">
              {calculateDiscountPercentage(product.price, product.discountPrice)}</span>% right now!
          </p>
        </div>
      )}
    </>
  );
}
