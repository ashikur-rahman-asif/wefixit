import Container from "@/components/container";
import { LabelIcon } from "@/components/icons/label-icon";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/star-rating";
import { ProductColorSelector } from "../_components/product-color-selector";
import { ProductImageGallery } from "../_components/product-image-gallery";
import { ProductQuantitySelector } from "../_components/product-quantity-selector";
export default async function ProductDetailsPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const productSlug = params.slug;

  console.log("params", props);
  return (
    <Container className="py-8 grid grid-cols-2 gap-14">
      <div>
        <ProductImageGallery />
      </div>
      <div>
        <h1 className="text-[28px] font-bold text-primary">
          ASUS X509JB Core I5 10th Gen NVIDIA MX110 Graphics 15.6 Inch FHD
          Laptop
        </h1>
        <p className="mt-3 text-base font-sans text-secondary">
          ASUS X509JB is a vast screen area for an immersive viewing experience
          for work and play. It has a wide-view FHD panel that features an
          anti-glare coating to reduce unwanted distractions from irritating
          glare and reflections, so you can truly focus on what&apos;s in front
          of you.
        </p>

        <div className="flex items-center gap-2 my-3">
          <StarRating rating={5} />
          <p className="text-secondary text-lg font-medium font-sans">
            20 Reviews
          </p>
        </div>

        <div className="flex items-center gap-3 my-3">
          <p className="text-brand font-bold text-[28px]">$356</p>
          <del className="text-primary font-medium text-lg">$456</del>
        </div>
        <div className="flex items-center gap-2 my-3">
          <LabelIcon className="w-4 h-4" />
          <p className="text-primary text-base font-medium font-sans">
            Save 50% right now!
          </p>
        </div>
        <ProductColorSelector />
        <ProductQuantitySelector />

        <div className="flex items-center gap-4 my-6">
          <Button variant="default" className="w-full sm:w-auto px-8">
            Add to Cart
          </Button>
          <Button variant="brand" className="w-full sm:w-auto px-8">
            Buy Now
          </Button>
        </div>
      </div>
    </Container>
  );
}
