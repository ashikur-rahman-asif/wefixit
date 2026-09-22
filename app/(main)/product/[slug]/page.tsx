import Container from "@/components/container";
import { calculateDiscountPercentage } from "@/lib/utils";
import { ProductHero } from "../_components/product-hero";
import { ProductDescription } from "../_components/product-description";
import { ProductSpecifications } from "../_components/product-specifications";
import { ProductReviews } from "../_components/product-reviews";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { publicProductsApi } from "@/features/products/api/public-products.api";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  try {
    const product = await publicProductsApi.getProductBySlug(params.slug);
    if (!product) return { title: "Product Not Found" };
    return {
      title: `${product.title} | WeFixit`,
      description: product.shortDescription || product.title,
      openGraph: {
        images: product.image ? [product.image] : [],
      },
    };
  } catch {
    return { title: "Product | WeFixit" };
  }
}

export default async function ProductDetailsPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const productSlug = params.slug;

  let product: Awaited<ReturnType<typeof publicProductsApi.getProductBySlug>> = null;
  let apiError = false;

  try {
    product = await publicProductsApi.getProductBySlug(productSlug);
  } catch {
    apiError = true;
  }

  if (apiError) {
    return (
      <Container className="py-6 md:py-8">
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <p className="text-xl font-semibold">Unable to load product</p>
          <p className="mt-2 text-sm">Please try again later or contact support.</p>
        </div>
      </Container>
    );
  }

  if (!product) {
    notFound();
  }

  const discountPercentage = calculateDiscountPercentage(product.price, product.discountPrice);

  return (
    <Container className="py-6 md:py-8">
      <ProductHero product={product} discountPercentage={discountPercentage} />
      <Tabs defaultValue="description" className="mt-12">
        <TabsList className="flex h-auto items-center justify-start gap-5 bg-transparent p-0">
          <TabsTrigger
            value="description"
            className="text-[20px] font-medium text-secondary bg-transparent p-0 shadow-none data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-brand data-[state=active]:underline data-[state=active]:underline-offset-8 data-active:shadow-none data-active:bg-transparent data-active:text-brand data-active:underline data-active:underline-offset-8 hover:text-brand dark:hover:text-brand cursor-pointer"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="specifications"
            className="text-[20px] font-medium text-secondary bg-transparent p-0 shadow-none data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-brand data-[state=active]:underline data-[state=active]:underline-offset-8 data-active:shadow-none data-active:bg-transparent data-active:text-brand data-active:underline data-active:underline-offset-8 hover:text-brand dark:hover:text-brand cursor-pointer"
          >
            Specifications
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="text-[20px] font-medium text-secondary bg-transparent p-0 shadow-none data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-brand data-[state=active]:underline data-[state=active]:underline-offset-8 data-active:shadow-none data-active:bg-transparent data-active:text-brand data-active:underline data-active:underline-offset-8 hover:text-brand dark:hover:text-brand cursor-pointer"
          >
            Reviews
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <ProductDescription product={product} />
        </TabsContent>
        <TabsContent value="specifications">
          <ProductSpecifications product={product} />
        </TabsContent>
        <TabsContent value="reviews">
          <ProductReviews product={product} />
        </TabsContent>
      </Tabs>
    </Container>
  );
}
