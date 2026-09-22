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
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WeFixIt - Expert Device Repair & Premium Electronics Store",
  description:
    "WeFixIt is your one-stop shop for professional device repairs and premium electronics. Shop new and pre-owned smartphones, tablets, laptops, and accessories.",
};

export default function HomePage() {
  return (
    <div className="space-y-10">
      <Hero />
      <Ratings />
      <HowWeWork />
      <RepairSlider />
      <Services />
      <Brands />
      <PreOwned />
      <Testimonials />
      <FAQ />
      <RequestCall />
    </div>
  );
}
