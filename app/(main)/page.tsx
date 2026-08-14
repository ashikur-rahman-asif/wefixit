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
