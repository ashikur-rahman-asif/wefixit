"use client";

import Container from "@/components/Container";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductCard } from "../product-card";

const repairItems = [
  { title: "Watch", image: "/home-slider/watch.webp", href: "/repair/watch" },
  {
    title: "iPhone",
    image: "/home-slider/iphone.webp",
    href: "/repair/iphone",
  },
  {
    title: "Android",
    image: "/home-slider/android.webp",
    href: "/repair/android",
  },
  { title: "iPad", image: "/home-slider/ipad.webp", href: "/repair/ipad" },
  {
    title: "Laptop",
    image: "/home-slider/laptop.webp",
    href: "/repair/laptop",
  },
  {
    title: "Tablet",
    image: "/home-slider/tablet.webp",
    href: "/repair/tablet",
  },
];

const CARD_HEIGHT = 340;

const subscribe = () => () => {};

export function RepairSlider() {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return (
    <section className="bg-white border-b border-border ">
      <style>{`
        .repair-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background-color: #9ca3af;
          opacity: 1;
          margin: 0 8px !important;
          transition: all 0.3s ease;
        }
        .repair-swiper .swiper-pagination-bullet-active {
          background-color: var(--color-brand);
          outline: 1.5px solid var(--color-brand);
          outline-offset: 3px;
        }
        .repair-swiper .swiper-slide {
          height: ${CARD_HEIGHT}px !important;
        }
      `}</style>

      <Container>
        <div className="flex flex-col lg:flex-row gap-7">
          <div
            className="w-full lg:w-1/4 shrink-0"
            style={{ height: CARD_HEIGHT }}>
            <div className="relative w-full h-full rounded-[14px] overflow-hidden p-6 md:p-8 flex flex-col items-start text-left group">
              <Image
                src="/home-slider/laptop-1st.webp"
                alt="What needs to be repaired?"
                fill
                className="object-cover transition-transform "
              />
              <div className="absolute inset-0 bg-black/10" />
              <h2 className="relative z-10 text-white text-[32px] md:text-[38px] font-bold leading-[1.1] mb-8 max-w-[250px]">
                What needs to be repaired?
              </h2>
              <Link
                href="/repair"
                className="relative z-10 inline-flex items-center gap-2 bg-white text-titleBlack px-6 py-3 rounded-full font-bold hover:bg-gray-50 transition-colors mt-auto shadow-md">
                Repaired <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-3/4 min-w-0">
            {!mounted ? (
              <div className="flex gap-7" style={{ height: CARD_HEIGHT + 48 }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex-1 bg-lightBrand border border-black/5 rounded-[14px] p-6 flex flex-col items-center"
                    style={{ height: CARD_HEIGHT }}>
                    <div className="w-32 h-32 bg-black/5 rounded-xl animate-pulse mt-4" />

                    <div className="w-20 h-5 bg-black/5 rounded-full animate-pulse mt-auto mb-4" />

                    <div className="w-36 h-11 bg-black/5 rounded-full animate-pulse mb-2" />
                  </div>
                ))}
              </div>
            ) : (
              <Swiper
                modules={[Pagination]}
                spaceBetween={28}
                slidesPerView={1}
                pagination={{ clickable: true }}
                touchStartPreventDefault={false}
                simulateTouch={false}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="repair-swiper !pb-12"
                style={{ height: CARD_HEIGHT + 48 }}>
                {repairItems.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <ProductCard
                      variant="slider"
                      title={item.title}
                      sliderButtonText="Repaired"
                      image={item.image}
                      href={item.href}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
