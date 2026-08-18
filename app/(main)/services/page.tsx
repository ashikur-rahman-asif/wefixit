import { Metadata } from "next";
import Image from "next/image";

import Container from "@/components/container";
import { RequestCall } from "@/components/home/request-call";
import { DeliveryBoyIcon } from "@/components/icons/delivery-boy";
import { DeliveryCarIcon } from "@/components/icons/delivery-car";
import { HouseIcon } from "@/components/icons/house";
import { WatchIcon } from "@/components/icons/watch";
import { ServicesHero } from "@/components/services/hero";

export const metadata: Metadata = {
  title: "Services | WeFixIt – Professional Phone Repair",
  description:
    "Explore WeFixIt's phone repair services: drop-off at our store, on-site repair in 30 minutes, and expedited pick-up & delivery. Fast, reliable, and affordable.",
  keywords: [
    "phone repair",
    "mobile repair service",
    "screen repair",
    "phone fix",
    "WeFixIt services",
    "on-site phone repair",
    "pickup and delivery repair",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | WeFixIt – Professional Phone Repair",
    description:
      "Explore WeFixIt's phone repair services: drop-off, on-site repair in 30 minutes, and expedited pick-up & delivery. Fast, reliable, affordable.",
    url: "/services",
    siteName: "WeFixIt",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | WeFixIt – Professional Phone Repair",
    description:
      "Fast, reliable phone repair: drop-off, on-site in 30 min, or pick-up & delivery. Discover WeFixIt services.",
  },
};

export default function Services() {
  return (
    <>
      <ServicesHero />
      <Container className="py-12 lg:py-24">
        <div className="space-y-16 lg:space-y-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-20 items-center">
            <div className="w-full">
              <Image
                src="/services/delivery.webp"
                width={585}
                height={450}
                alt="delivery-boy"
                className="rounded-2xl object-cover w-full h-auto lg:h-[450px]"
              />
            </div>
            <div className="w-full">
              <span className="flex gap-3 md:gap-4 items-center">
                <HouseIcon />
                <h6 className="text-gray-500 text-sm md:text-base lg:text-sm xl:text-xl tracking-wider font-montserrat">
                  Drop off at our store location
                </h6>
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-[28px] xl:text-[40px] text-primary font-bold leading-tight xl:leading-[48px] mt-3 font-prompt">
                Your Trusted Phone Repair Experts Shop
              </h2>
              <p className="text-gray-500 text-sm md:text-base lg:text-[15px] xl:text-lg font-montserrat leading-relaxed mt-3 lg:mt-4 xl:mt-6">
                At WeFixIt, we pride ourselves on delivering top-notch phone
                repair services with unmatched expertise and care. Our dedicated
                team of skilled technicians is committed to providing quick,
                reliable, and affordable solutions to all your phone issues.
                Discover our story, values, and the passion that drives us to
                keep your devices running smoothly. Experience unparalleled
                phone repair services at WeFixIt, where our skilled technicians
                prioritize your needs with precision and professionalism.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-20 items-center">
            <div className="w-full lg:order-last">
              <Image
                src="/services/repair.webp"
                width={585}
                height={450}
                alt="repair"
                className="rounded-2xl object-cover w-full h-auto lg:h-[450px]"
              />
            </div>
            <div className="w-full">
              <span className="flex gap-3 md:gap-4 items-center">
                <WatchIcon />
                <h6 className="text-gray-500 text-sm md:text-base lg:text-sm xl:text-xl tracking-wider font-montserrat">
                  On-Site repair in 30 min
                </h6>
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-[28px] xl:text-[40px] text-primary font-bold leading-tight xl:leading-[48px] mt-3 font-prompt">
                Why WeFixIt is Your Best Choice
              </h2>
              <p className="text-gray-500 text-sm md:text-base lg:text-[15px] xl:text-lg font-montserrat leading-relaxed mt-3 lg:mt-4 xl:mt-6">
                WeFixIt stands out as your best choice for phone repairs due to
                our unwavering commitment to excellence. Our experienced team
                prioritizes precision, reliability, and efficiency, ensuring
                every repair is performed to the highest standards. Learn how
                our dedication to using quality parts, providing clear
                communication, and delivering exceptional results has earned us
                the trust of our customers. Discover the unparalleled commitment
                and expertise that make WeFixIt your top choice for phone
                repairs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-20 items-center">
            <div className="w-full">
              <Image
                src="/services/delivery-boy.webp"
                width={585}
                height={450}
                alt="delivery-boy"
                className="rounded-2xl object-cover w-full h-auto lg:h-[450px]"
              />
            </div>
            <div className="w-full">
              <span className="flex gap-3 md:gap-4 items-center">
                <DeliveryCarIcon />
                <h6 className="text-gray-500 text-sm md:text-base lg:text-sm xl:text-xl tracking-wider font-montserrat">
                  Expedited pick up and delivery
                </h6>
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-[28px] xl:text-[40px] text-primary font-bold leading-tight xl:leading-[48px] mt-3 font-prompt">
                Expedited Pickup & Delivery Service
              </h2>
              <p className="text-gray-500 text-sm md:text-base lg:text-[15px] xl:text-lg font-montserrat leading-relaxed mt-3 lg:mt-4 xl:mt-6">
                At WeFixIt, we pride ourselves on delivering top-notch phone
                repair services with unmatched expertise and care. Our dedicated
                team of skilled technicians is committed to providing quick,
                reliable, and affordable solutions to all your phone issues.
                Discover our story, values, and the passion that drives us to
                keep your devices running smoothly. Experience unparalleled
                phone repair services at WeFixIt, where our skilled technicians
                prioritize your needs with precision and professionalism.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-20 items-center">
            <div className="w-full lg:order-last">
              <Image
                src="/services/learning.webp"
                width={575}
                height={450}
                alt="pickup"
                className="rounded-2xl object-cover w-full h-auto lg:h-[450px]"
              />
            </div>
            <div className="w-full">
              <span className="flex gap-3 md:gap-4 items-center">
                <DeliveryBoyIcon />
                <h6 className="text-gray-500 text-sm md:text-base lg:text-sm xl:text-xl tracking-wider font-montserrat">
                  Standard pickup and deliver service
                </h6>
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-[28px] xl:text-[40px] text-primary font-bold leading-tight xl:leading-[48px] mt-3 font-prompt">
                Standard Pickup & Delivery at Your Door
              </h2>
              <p className="text-gray-500 text-sm md:text-base lg:text-[15px] xl:text-lg font-montserrat leading-relaxed mt-3 lg:mt-4 xl:mt-6">
                At WeFixIt, we pride ourselves on delivering top-notch phone
                repair services with unmatched expertise and care. Our dedicated
                team of skilled technicians is committed to providing quick,
                reliable, and affordable solutions to all your phone issues.
                Discover our story, values, and the passion that drives us to
                keep your devices running smoothly. Experience unparalleled
                phone repair services at WeFixIt, where our skilled technicians
                prioritize your needs with precision and professionalism.
              </p>
            </div>
          </div>
        </div>
      </Container>

      <RequestCall />
    </>
  );
}
