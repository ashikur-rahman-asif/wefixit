"use client";

import { SectionTitle } from "@/components/section-title";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSyncExternalStore } from "react";
import "swiper/css";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { RecentBlogCard } from "./recent-blog-card";
import { Blog } from "@/features/blogs/types/blog.types";
import { format } from "date-fns";

interface RecentArticlesProps {
  articles: Blog[];
}

const subscribe = () => () => {};

export function RecentArticles({ articles }: RecentArticlesProps) {
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
          title="Recent Articles"
          description="Newest update article from wefixit"
          align="left"
          className="flex-1"
        />

        <div className="flex items-center gap-3 shrink-0">
          <button
            id="recent-articles-prev"
            aria-label="Previous"
            className="w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center text-primary hover:bg-brand hover:text-white hover:border-brand transition-all duration-200 disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            id="recent-articles-next"
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
        className="overflow-hidden !pb-4"
      >
        {articles.map((article) => (
          <SwiperSlide key={article.id} className="h-auto">
            <RecentBlogCard
              imageSrc={article.image || "/blog/top-blog-1.jpg"}
              date={
                article.published_at
                  ? format(new Date(article.published_at), "d MMM yyyy")
                  : format(new Date(article.created_at), "d MMM yyyy")
              }
              category={article.category?.name || "General"}
              title={article.title}
              href={`/blog/${article.slug}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
