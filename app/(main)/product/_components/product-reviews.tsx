import { Product } from "@/types/product";

interface ProductReviewsProps {
  product: Product;
}

export function ProductReviews({ product }: ProductReviewsProps) {
  return (
    <div className="mt-4 text-lg font-medium text-secondary">
      <p>Reviews for {product.title} will go here.</p>
    </div>
  );
}
