"use client";

import Container from "@/components/container";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import "swiper/css";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductCard } from "../product-card";
import { SectionTitle } from "../section-title";
import { Product } from "@/features/products/types/product.types";

interface PreOwnedProps {
  products: Product[];
}

export function PreOwned({ products }: PreOwnedProps) {
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

        <div className="flex justify-center mt-8 md:mt-12">
          <Link href="/shop" className={buttonVariants({ variant: "default", size: "default" })}>
            See More
          </Link>
        </div>
      </Container>
    </section>
  );
}
