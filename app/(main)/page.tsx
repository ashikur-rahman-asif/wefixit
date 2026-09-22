import { Brands } from "@/components/home/brands";
import { FAQ } from "@/components/home/faq";
import { Hero } from "@/components/home/hero";
import { HowWeWork } from "@/components/home/how-we-work";
import { PreOwned } from "@/components/home/pre-owned";
import { Ratings } from "@/components/home/ratings";
import { RepairSlider } from "@/components/home/repair-slider";
import { RequestCall } from "@/components/home/request-call";
import { Services } from "@/components/home/services";
import { Testimonials } from "@/components/home/testimonials";
import { publicProductsApi } from "@/features/products/api/public-products.api";
import { Product } from "@/features/products/types/product.types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WeFixIt - Expert Device Repair & Premium Electronics Store",
  description:
    "WeFixIt is your one-stop shop for professional device repairs and premium electronics. Shop new and pre-owned smartphones, tablets, laptops, and accessories.",
};

export default async function HomePage() {
  let featuredProducts: Product[] = [];
  try {
    featuredProducts = await publicProductsApi.getFeaturedProducts();
  } catch (error) {
    console.error("Failed to fetch featured products for home page:", error);
  }

  return (
    <div className="space-y-10">
      <Hero />
      <Ratings />
      <HowWeWork />
      <RepairSlider />
      <Services />
      <Brands />
      {featuredProducts.length > 0 && <PreOwned products={featuredProducts} />}
      <Testimonials />
      <FAQ />
      <RequestCall />
    </div>
  );
}
