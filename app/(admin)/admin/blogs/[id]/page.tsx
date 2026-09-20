"use client";

import { use, useEffect } from "react";
import { BlogForm } from "../_components/BlogForm";
import { type BlogFormData } from "@/validators/admin";
import { useAdminBlog, useUpdateBlog } from "@/features/blogs/hooks/use-admin-blogs";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Loader } from "@/components/ui/loader";

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

export default function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = use(params);
  const router = useRouter();
  
  const { data: blog, isLoading } = useAdminBlog(Number(id));
  const updateMutation = useUpdateBlog();

  const handleSubmit = (data: BlogFormData) => {
    updateMutation.mutate(
      { id: Number(id), data },
      {
        onSuccess: () => {
          router.push("/admin/blogs");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col h-[400px] items-center justify-center text-center">
        <h3 className="text-lg font-semibold text-titleBlack mb-2">
          Blog not found
        </h3>
        <p className="text-textGray mb-6">
          The blog you are looking for does not exist or has been deleted.
        </p>
        <Link
          href="/admin/blogs"
          className="h-11 px-6 bg-brand text-white rounded-xl text-sm font-bold flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Go Back
        </Link>
      </div>
    );
  }

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
        <h1 className="text-[24px] font-bold text-titleBlack leading-none mb-1">
          Edit Blog
        </h1>
        <p className="text-textGray text-sm">
          Update the blog details
        </p>
      </div>

      <BlogForm
        initialData={blog}
        onSubmit={handleSubmit}
        isSubmitting={updateMutation.isPending}
      />
    </div>
  );
}
