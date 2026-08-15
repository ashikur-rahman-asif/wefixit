"use client";

import Container from "@/components/Container";
import { StarRating } from "@/components/ui/star-rating";
import Image from "next/image";
import { useSyncExternalStore } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SectionTitle } from "../section-title";

const testimonials = [
  {
    quote:
      "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change.",
    name: "Leslie Alexander",
    role: "Founder",
    image: "/home-slider/Oval-1.png",
    rating: 5,
  },
  {
    quote:
      "Simply the best. Better than all the rest. I'd recommend this product to beginners and advanced users.",
    name: "Jacob Jones",
    role: "Co-Founder",
    image: "/home-slider/Oval-2.png",
    rating: 5,
  },
  {
    quote:
      "I cannot believe that I have got a brand new landing page after getting Omega. It was super easy to edit and faster and easier to work.",
    name: "Jenny Wilson",
    role: "Chief Marketing Officer",
    image: "/home-slider/Oval-3.png",
    rating: 5,
  },
  {
    quote:
      "WeFixIt has completely transformed how I handle device repairs. Professional service, fast turnaround, and quality results every single time.",
    name: "Robert Fox",
    role: "Product Manager",
    image: "/home-slider/Oval-1.png",
    rating: 5,
  },
  {
    quote:
      "Outstanding experience from start to finish. The team went above and beyond to ensure my device was repaired perfectly. Highly recommended!",
    name: "Cody Fisher",
    role: "CEO",
    image: "/home-slider/Oval-2.png",
    rating: 5,
  },
];

const subscribe = () => () => {};

function TestimonialCard({
  quote,
  name,
  role,
  image,
  rating,
}: (typeof testimonials)[0]) {
  return (
    <div className="bg-white rounded-[14px] p-7 flex flex-col h-full">
      <StarRating rating={rating} className="mb-5" />
      <p className="text-[15px] text-titleBlack/80 font-montserrat leading-relaxed flex-1 mb-6">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 mt-auto">
        <Image
          src={image}
          alt={name}
          width={48}
          height={48}
          className="rounded-full w-12 h-12 object-cover shrink-0"
        />
        <div>
          <p className="text-sm font-bold text-titleBlack font-montserrat">
            {name}
          </p>
          <p className="text-xs text-secondary font-montserrat">{role}</p>
        </div>
      </div>
    </div>
  );
}

function TestimonialSkeleton() {
  return (
    <div className="bg-white rounded-[14px] p-7 flex flex-col h-full min-h-[260px]">
      <div className="flex gap-1 mb-5">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-5 h-5 bg-black/10 rounded-full animate-pulse"
          />
        ))}
      </div>
      <div className="flex flex-col gap-2 flex-1 mb-6">
        <div className="w-full h-4 bg-black/5 rounded-full animate-pulse" />
        <div className="w-full h-4 bg-black/5 rounded-full animate-pulse" />
        <div className="w-3/4 h-4 bg-black/5 rounded-full animate-pulse" />
        <div className="w-5/6 h-4 bg-black/5 rounded-full animate-pulse" />
      </div>
      <div className="flex items-center gap-3 mt-auto">
        <div className="w-12 h-12 rounded-full bg-black/10 animate-pulse shrink-0" />
        <div className="flex flex-col gap-1.5">
          <div className="w-28 h-3.5 bg-black/10 rounded-full animate-pulse" />
          <div className="w-20 h-3 bg-black/5 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  return (
    <section className="relative">
      <style>{`
        .testimonials-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background-color: rgba(255,255,255,0.4);
          opacity: 1;
          margin: 0 6px !important;
          transition: all 0.3s ease;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          background-color: #ffffff;
          outline: 1.5px solid #ffffff;
          outline-offset: 3px;
        }
      `}</style>

      <Image
        width={1440}
        height={502}
        src="/hero-bg-pattern-lg.webp"
        quality={100}
        alt="hero-bg-pattern"
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
      />

      <Container className="py-7 md:py-16">
        <div className="relative z-10">
          <SectionTitle
            subtitleClassName="text-white tracking-normal normal-case"
            subtitle="2,157 people have said how good Rareblocks"
            title="Our happy clients say about us"
            titleClassName="text-white"
            align="center"
          />

          <div className="mt-8 md:mt-12">
            {!mounted ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[0, 1, 2].map((i) => (
                  <TestimonialSkeleton key={i} />
                ))}
              </div>
            ) : (
              <Swiper
                modules={[Pagination]}
                spaceBetween={24}
                slidesPerView={1}
                pagination={{ clickable: true }}
                breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 24 },
                }}
                className="testimonials-swiper !pb-12">
                {testimonials.map((t, i) => (
                  <SwiperSlide key={i} style={{ height: "auto" }}>
                    <TestimonialCard {...t} />
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
