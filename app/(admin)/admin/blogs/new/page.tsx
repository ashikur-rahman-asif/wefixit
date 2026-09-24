"use client";

import { BlogForm } from "../_components/BlogForm";
import { type BlogFormData } from "@/features/blogs/schemas/blog.schema";
import { useCreateBlog } from "@/features/blogs/hooks/use-admin-blogs";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewBlogPage() {
  const router = useRouter();
  const createMutation = useCreateBlog();

  const handleSubmit = (data: BlogFormData) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        router.push("/admin/blogs");
      },
    });
  };

  return (
    <div className="bg-[#F8F9FB] min-h-screen p-6">
      <div className="mb-6">
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-2 text-textGray hover:text-brand transition-colors text-sm font-semibold mb-4 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blogs
        </Link>
        <h1 className="text-[24px] font-bold text-titleBlack leading-none mb-1">Add New Blog</h1>
        <p className="text-textGray text-sm">Create a new blog post</p>
      </div>

      <BlogForm onSubmit={handleSubmit} isSubmitting={createMutation.isPending} />
    </div>
  );
}
