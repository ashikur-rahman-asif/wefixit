import Container from "@/components/container";
import Image from "next/image";
import { BlogContent } from "./_components/blog-content";
import { SocialShare } from "./_components/social-share";
import { publicBlogsApi } from "@/features/blogs/api/public-blogs.api";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { format } from "date-fns";

interface SingleBlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SingleBlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await publicBlogsApi.getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found - WeFixIt",
    };
  }

  return {
    title: blog.meta_title || `${blog.title} - WeFixIt`,
    description: blog.meta_description || blog.title,
    openGraph: {
      title: blog.meta_title || blog.title,
      description: blog.meta_description || blog.title,
      images: blog.image ? [{ url: blog.image }] : [],
    },
  };
}

export default async function SingleBlogPage({ params }: SingleBlogPageProps) {
  const { slug } = await params;
  const blog = await publicBlogsApi.getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const date = blog.published_at 
    ? format(new Date(blog.published_at), "d MMM yyyy") 
    : format(new Date(blog.created_at), "d MMM yyyy");

  return (
    <div className="bg-white">
      <Container className="py-2 lg:py-6">
        <div className="max-w-4xl mx-auto text-center mb-6 md:mb-10 mt-8">
          <div className="flex items-center justify-center gap-2 text-secondary font-medium mb-3 md:mb-4 text-sm md:text-base">
            <span>{date}</span>
            <span className="size-1.5 bg-secondary rounded-full"></span>
            <span className="text-brand">{blog.category?.name || "General"}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
            {blog.title}
          </h1>
        </div>

        <div className="relative w-full aspect-video md:aspect-1240/531 rounded-2xl md:rounded-[32px] overflow-hidden mb-8 md:mb-12 mx-auto max-w-6xl shadow-sm">
          <Image
            src={blog.image || "/blog/top-blog-1.jpg"}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <BlogContent content={blog.content} />
          <div className="mt-8 md:mt-12 pt-8 border-t border-gray-100">
            <SocialShare url={`${process.env.NEXT_PUBLIC_APP_URL}/blog/${blog.slug}`} />
          </div>
        </div>
      </Container>
    </div>
  );
}
