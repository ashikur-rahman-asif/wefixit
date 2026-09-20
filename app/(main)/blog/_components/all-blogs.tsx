"use client";

import { SectionTitle } from "@/components/section-title";
import { Pagination } from "@/components/ui/pagination";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/features/blogs/types/blog.types";
import { format } from "date-fns";

function stripTags(html: string) {
  return html.replace(/<[^>]*>?/gm, '');
}

interface AllBlogsProps {
  blogs: Blog[];
  meta: {
    currentPage: number;
    totalPages: number;
  };
}

export function AllBlogs({ blogs, meta }: AllBlogsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="pt-12 md:pt-16 lg:pt-20">
      <SectionTitle
        title="All Blogs"
        description="Explore all our articles and tips"
        align="left"
        className="mb-8 md:mb-12"
      />

      <div className="flex flex-col gap-8 md:gap-10 w-full">
        {blogs.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No blogs found.</div>
        ) : (
          blogs.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group flex flex-col sm:flex-row gap-5 md:gap-8 items-start sm:items-center border-b border-gray-100 pb-8 md:pb-10 last:border-0 last:pb-0 transition-all duration-300"
            >
              <div className="w-full sm:w-60 md:w-70 shrink-0 aspect-16/10 sm:aspect-square md:aspect-4/3 relative rounded-xl md:rounded-[16px] overflow-hidden">
                <Image
                  src={article.image || "/blog/top-blog-1.jpg"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              <div className="flex flex-col flex-1 py-1 md:py-2">
                <div className="flex items-center gap-2 text-secondary text-xs md:text-sm font-semibold mb-2 md:mb-3">
                  <span>{article.published_at ? format(new Date(article.published_at), "d MMM yyyy") : format(new Date(article.created_at), "d MMM yyyy")}</span>
                  <span className="size-1 bg-secondary/60 rounded-full"></span>
                  <span>{article.category?.name || "General"}</span>
                </div>
                <h3 className="text-primary font-semibold text-lg md:text-2xl leading-snug group-hover:text-brand transition-colors mb-2 md:mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-secondary text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3">
                  {stripTags(article.content)}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>

      {meta.totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <Pagination
            currentPage={meta.currentPage}
            totalPages={meta.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
}
