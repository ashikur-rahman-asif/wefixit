"use client";

import Container from "@/components/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import "swiper/css";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductCard } from "../product-card";
import { SectionTitle } from "../section-title";
import { Product } from "@/features/products/types/product.types";

interface PreOwnedProps {
  products: Product[];
}

const subscribe = () => () => {};

export function PreOwned({ products }: PreOwnedProps) {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className=" overflow-hidden">
      <Container>
        <div className="flex items-end justify-between mb-6 md:mb-10 gap-4 flex-wrap">
          <SectionTitle title="We also sell pre-owned devices" align="left" className="flex-1" />

          <div className="flex items-center gap-3 shrink-0">
            <button
              id="pre-owned-prev"
              aria-label="Previous"
              className="w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center text-primary hover:bg-brand hover:text-white hover:border-brand transition-all duration-200 disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              id="pre-owned-next"
              aria-label="Next"
              className="w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center text-primary hover:bg-brand hover:text-white hover:border-brand transition-all duration-200 disabled:opacity-30 cursor-pointer"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {!mounted ? (
          <div className="flex gap-4 sm:gap-5 overflow-hidden">
            {Array.from({ length: Math.min(products.length, 4) }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "flex-shrink-0 w-[calc(50%-6px)] sm:w-[calc(50%-8px)] md:w-[calc(33.333%-13.33px)] xl:w-[calc(25%-18px)]",
                  i >= 2 && "hidden md:block",
                  i >= 3 && "hidden xl:block",
                )}
              >
                <div className="w-full h-80 bg-lightBrand rounded-[14px] p-6 flex flex-col justify-between border border-black/5">
                  <div className="w-full h-32 bg-black/5 rounded-xl animate-pulse" />
                  <div className="w-3/4 h-6 bg-black/5 rounded animate-pulse mt-4" />
                  <div className="w-1/3 h-8 bg-black/5 rounded animate-pulse mt-auto" />
                </div>
              </div>
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
            slidesPerView={2}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 12 },
              640: { slidesPerView: 2, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="overflow-hidden"
          >
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
          <Link href="/shop" className={buttonVariants({ variant: "default", size: "default" })}>
            See More
          </Link>
        </div>
      </Container>
    </section>
  );
}
