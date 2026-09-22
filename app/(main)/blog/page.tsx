import { Metadata } from "next";

import { BlogHero } from "@/components/blog/hero";
import Container from "@/components/container";
import { TopBlogCard } from "./_components/top-blog-card";
import { RecentArticles } from "./_components/recent-articles";
import { AllBlogs } from "./_components/all-blogs";
import { publicBlogsApi } from "@/features/blogs/api/public-blogs.api";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "Blog - WeFixIt",
  description: "Stay Informed with the WeFixIt Blog",
};

interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function stripTags(html: string) {
  return html.replace(/<[^>]*>?/gm, "");
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  const category = resolvedSearchParams.category as string | undefined;

  const response = await publicBlogsApi.getBlogs(page, category);
  const allBlogs = response.data;

  const topBlogsResponse = await publicBlogsApi.getTopBlogs();
  const topBlogs = topBlogsResponse.data.filter((b) => b.is_top).slice(0, 2);

  const topBlogIds = new Set(topBlogs.map((b) => b.id));
  const otherBlogs = allBlogs.filter((b) => !topBlogIds.has(b.id));

  const recentBlogs = otherBlogs.slice(0, 4);

  const isFirstPage = page === 1;

  return (
    <>
      <BlogHero />
      <Container className="py-6 lg:py-10">
        {isFirstPage && topBlogs.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {topBlogs.map((blog) => (
              <TopBlogCard
                key={blog.id}
                imageSrc={blog.image || "/blog/top-blog-1.jpg"}
                date={
                  blog.published_at
                    ? format(new Date(blog.published_at), "d MMM yyyy")
                    : format(new Date(blog.created_at), "d MMM yyyy")
                }
                category={blog.category?.name || "General"}
                title={blog.title}
                description={stripTags(blog.content).substring(0, 150) + "..."}
                href={`/blog/${blog.slug}`}
              />
            ))}
          </div>
        )}

        {/* recent articles  */}
        {isFirstPage && recentBlogs.length > 0 && <RecentArticles articles={recentBlogs} />}

        {/* all blogs  */}
        <AllBlogs
          blogs={allBlogs}
          meta={{
            currentPage: response.current_page,
            totalPages: response.last_page,
          }}
        />
      </Container>
    </>
  );
}
