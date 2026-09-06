import Container from "@/components/container";
import { ProductColorSelector } from "../_components/product-color-selector";
import { ProductImageGallery } from "../_components/product-image-gallery";
import { ProductQuantitySelector } from "../_components/product-quantity-selector";
import { ProductInfo } from "../_components/product-info";
import { ProductActions } from "../_components/product-actions";
import { Product } from "@/types/product";
import { calculateDiscountPercentage } from "@/lib/utils";

export default async function ProductDetailsPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const productSlug = params.slug;


  const product: Product = {
    id: 1,
    title: "ASUS X509JB Core I5 10th Gen NVIDIA MX110 Graphics 15.6 Inch FHD Laptop",
    slug: productSlug,
    image: "/HP_Lptp.webp",
    images: ["/HP_Lptp.webp", "/HP_Lptp.webp", "/HP_Lptp.webp", "/HP_Lptp.webp"],
    price: 456,
    discountPrice: 356,
    description: "ASUS X509JB is a vast screen area for an immersive viewing experience for work and play. It has a wide-view FHD panel that features an anti-glare coating to reduce unwanted distractions from irritating glare and reflections, so you can truly focus on what's in front of you.",
    rating: 4.7,
    reviewsCount: 20,
    stock: 10,
    colors: [
      { id: 1, name: "red", class: "bg-red-800", ringClass: "ring-red-800" },
      { id: 2, name: "yellow", class: "bg-yellow-500", ringClass: "ring-yellow-500" },
      { id: 3, name: "green", class: "bg-green-800", ringClass: "ring-green-800" },
      { id: 4, name: "purple", class: "bg-purple-700", ringClass: "ring-purple-700" },
    ]
  };

  const discountPercentage = calculateDiscountPercentage(product.price, product.discountPrice);

  return (
    <Container className="py-6 md:py-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
      <div className="md:sticky md:top-24 md:self-start">
        <ProductImageGallery images={product.images || [product.image]} discountPercentage={discountPercentage} />
      </div>
      <div>
        <ProductInfo product={product} />
        <ProductColorSelector colors={product.colors} />
        {(!product.stock || product.stock > 0) && (
          <ProductQuantitySelector />
        )}
        <ProductActions isOutOfStock={product.stock === 0} />
      </div>
    </Container>
  );
}
