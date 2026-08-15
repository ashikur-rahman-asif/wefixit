"use client";

import Container from "@/components/Container";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import "swiper/css";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductCard } from "../product-card";
import { SectionTitle } from "../section-title";

const preOwnedProducts = [
  {
    image: "/home-slider/watch.webp",
    title: "Apple Watch Series 8 GPS 41mm",
    price: "199.99",
    discountPrice: "329.00",
    href: "/pre-owned/apple-watch-series-8",
  },
  {
    image: "/home-slider/iphone.webp",
    title: "iPhone 13 Pro Max 256GB – Unlocked",
    price: "549.00",
    discountPrice: "899.00",
    href: "/pre-owned/iphone-13-pro-max",
  },
  {
    image: "/home-slider/android.webp",
    title: "Samsung Galaxy S22 Ultra 128GB",
    price: "399.00",
    discountPrice: "649.99",
    href: "/pre-owned/samsung-galaxy-s22-ultra",
  },
  {
    image: "/home-slider/laptop.webp",
    title: 'MacBook Air M1 13" 8GB RAM',
    price: "699.00",
    discountPrice: "999.00",
    href: "/pre-owned/macbook-air-m1",
  },
  {
    image: "/home-slider/ipad.webp",
    title: "iPad Air 5th Gen 64GB WiFi",
    price: "399.00",
    discountPrice: "599.00",
    href: "/pre-owned/ipad-air-5th-gen",
  },
  {
    image: "/home-slider/tablet.webp",
    title: "Samsung Galaxy Tab S8 128GB",
    price: "329.00",
    discountPrice: "499.99",
    href: "/pre-owned/samsung-galaxy-tab-s8",
  },
  {
    image: "/home-slider/laptop-1st.webp",
    title: "Dell XPS 13 Intel i7 16GB RAM",
    price: "749.00",
    discountPrice: "1099.00",
    href: "/pre-owned/dell-xps-13",
  },
  {
    image: "/home-slider/main.webp",
    title: "GoPro HERO6 4K Action Camera",
    price: "99.50",
    discountPrice: "149.99",
    href: "/pre-owned/gopro-hero6",
  },
];

const subscribe = () => () => {};

function ProductCardSkeleton() {
  return (
    <div className="relative p-6 bg-lightBrand border border-black/5 rounded-[14px] flex flex-col items-center text-center h-full justify-between min-h-[300px]">
      <div className="absolute top-4 left-4 w-14 h-5 bg-black/5 rounded-full animate-pulse" />
      <div className="w-full flex justify-center items-center mb-6 min-h-40">
        <div className="w-36 h-32 bg-black/5 rounded-xl animate-pulse" />
      </div>
      <div className="w-full flex flex-col items-center flex-1 gap-2">
        <div className="w-3/4 h-4 bg-black/5 rounded-full animate-pulse" />
        <div className="w-1/2 h-4 bg-black/5 rounded-full animate-pulse" />
        <div className="flex items-center gap-3 mt-auto pt-6 pb-2">
          <div className="w-20 h-8 bg-black/5 rounded-full animate-pulse" />
          <div className="w-14 h-5 bg-black/5 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function PreOwned() {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  return (
    <section className=" overflow-hidden">
      <Container>
        <div className="flex items-end justify-between mb-6 md:mb-10 gap-4 flex-wrap">
          <SectionTitle
            title="We also sell pre-owned devices"
            align="left"
            className="flex-1"
          />

          <div className="flex items-center gap-3 shrink-0">
            <button
              id="pre-owned-prev"
              aria-label="Previous"
              className="w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center text-primary hover:bg-brand hover:text-white hover:border-brand transition-all duration-200 disabled:opacity-30">
              <ChevronLeft className="size-5" />
            </button>
            <button
              id="pre-owned-next"
              aria-label="Next"
              className="w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center text-primary hover:bg-brand hover:text-white hover:border-brand transition-all duration-200 disabled:opacity-30">
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {!mounted ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {[0, 1, 2, 3].map((i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Navigation, A11y]}
            navigation={{
              prevEl: "#pre-owned-prev",
              nextEl: "#pre-owned-next",
            }}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 16 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="overflow-hidden">
            {preOwnedProducts.map((product) => (
              <SwiperSlide key={product.title} className="h-auto">
                <ProductCard
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  discountPrice={product.discountPrice}
                  href={product.href}
                  className="h-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="flex justify-center mt-8 md:mt-12">
          <Link
            href="/pre-owned"
            className={buttonVariants({ variant: "default", size: "default" })}>
            See More
          </Link>
        </div>
      </Container>
    </section>
  );
}
