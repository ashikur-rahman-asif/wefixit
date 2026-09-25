import { Blog } from "@/features/blogs/types/blog.types";
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

  let allBlogs: Blog[] = [];
  let topBlogs: Blog[] = [];
  let currentPage = page;
  let lastPage = 1;
  let apiError = false;

  try {
    const [response, topBlogsResponse] = await Promise.all([
      publicBlogsApi.getBlogs(page, category),
      publicBlogsApi.getTopBlogs(),
    ]);

    allBlogs = response.data;
    currentPage = response.current_page;
    lastPage = response.last_page;

    topBlogs = topBlogsResponse.data.filter((b) => b.is_top).slice(0, 2);
  } catch {
    apiError = true;
  }

  const topBlogIds = new Set(topBlogs.map((b) => b.id));
  const otherBlogs = allBlogs.filter((b) => !topBlogIds.has(b.id));
  const recentBlogs = otherBlogs.slice(0, 4);
  const isFirstPage = page === 1;

  if (apiError) {
    return (
      <>
        <BlogHero />
        <Container className="py-6 lg:py-10">
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <p className="text-xl font-semibold">Unable to load blog posts</p>
            <p className="mt-2 text-sm">Please try again later or contact support.</p>
          </div>
        </Container>
      </>
    );
  }

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
            currentPage: currentPage,
            totalPages: lastPage,
          }}
        />
      </Container>
    </>
  );
}
