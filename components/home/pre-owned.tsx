"use client";

import Container from "@/components/container";
import { buttonVariants } from "@/components/ui/button";
import { useFeaturedProducts } from "@/features/products/hooks/use-featured-products";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import "swiper/css";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductCard } from "../product-card";
import { SectionTitle } from "../section-title";

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

  const { data: products = [], isLoading } = useFeaturedProducts();

  const showSkeleton = !mounted || isLoading;

  if (!showSkeleton && products.length === 0) {
    return null;
  }

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
              className="w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center text-primary hover:bg-brand hover:text-white hover:border-brand transition-all duration-200 disabled:opacity-30 cursor-pointer">
              <ChevronLeft className="size-5" />
            </button>
            <button
              id="pre-owned-next"
              aria-label="Next"
              className="w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center text-primary hover:bg-brand hover:text-white hover:border-brand transition-all duration-200 disabled:opacity-30 cursor-pointer">
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {showSkeleton ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {[0, 1, 2, 3].map((i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? null : (
          <Swiper
            modules={[Navigation, A11y]}
            navigation={{
              prevEl: "#pre-owned-prev",
              nextEl: "#pre-owned-next",
            }}
            spaceBetween={16}
            slidesPerView={2}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 12 },
              640: { slidesPerView: 2, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="overflow-hidden">
            {products.map((product) => (
              <SwiperSlide key={product.slug} className="h-auto">
                <ProductCard
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  discountPrice={product.discountPrice}
                  href={`/shop/${product.slug}`}
                  className="h-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="flex justify-center mt-8 md:mt-12">
          <Link
            href="/shop"
            className={buttonVariants({ variant: "default", size: "default" })}>
            See More
          </Link>
        </div>
      </Container>
    </section>
  );
}

