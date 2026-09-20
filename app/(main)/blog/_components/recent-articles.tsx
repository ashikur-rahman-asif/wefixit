"use client";

import { SectionTitle } from "@/components/section-title";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSyncExternalStore } from "react";
import "swiper/css";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { RecentBlogCard } from "./recent-blog-card";

// Dummy data for recent articles
const recentArticlesData = [
  {
    id: 1,
    imageSrc: "/blog/top-blog-1.jpg",
    date: "16 May 2022",
    category: "Career Tips",
    title: "How Intrapreneurship Can Help You Stand Out At Work",
  },
  {
    id: 2,
    imageSrc: "/blog/top-blog-2.jpg",
    date: "3 Sep 2022",
    category: "Interviews",
    title: "How To Know Your Resume Is Ready To Be Submitted",
  },
  {
    id: 3,
    imageSrc: "/blog/top-blog-1.jpg",
    date: "7 Feb 2022",
    category: "Interviews",
    title: "How To Sharpen Your Social Skills When You WFH",
  },
  {
    id: 4,
    imageSrc: "/blog/top-blog-2.jpg",
    date: "12 Jan 2022",
    category: "Career Tips",
    title: "5 Tips for Staying Productive Working from Home",
  },
];

const subscribe = () => () => {};

export function RecentArticles() {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return null; // Avoid hydration mismatch on Swiper
  }

  return (
    <section className="pt-12 md:pt-16 lg:pt-20 overflow-hidden">
      <div className="flex items-end justify-between mb-8 md:mb-12 gap-4 flex-wrap">
        <SectionTitle
          title="Recently Articles"
          description="Newest update article from jobify"
          align="left"
          className="flex-1"
        />

        <div className="flex items-center gap-3 shrink-0">
          <button
            id="recent-articles-prev"
            aria-label="Previous"
            className="w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center text-primary hover:bg-brand hover:text-white hover:border-brand transition-all duration-200 disabled:opacity-30 cursor-pointer">
            <ChevronLeft className="size-5" />
          </button>
          <button
            id="recent-articles-next"
            aria-label="Next"
            className="w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center text-primary hover:bg-brand hover:text-white hover:border-brand transition-all duration-200 disabled:opacity-30 cursor-pointer">
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, A11y]}
        navigation={{
          prevEl: "#recent-articles-prev",
          nextEl: "#recent-articles-next",
        }}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 16 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
        className="overflow-hidden !pb-4">
        {recentArticlesData.map((article) => (
          <SwiperSlide key={article.id} className="h-auto">
            <RecentBlogCard
              imageSrc={article.imageSrc}
              date={article.date}
              category={article.category}
              title={article.title}
              href={`/blog/${article.id}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
