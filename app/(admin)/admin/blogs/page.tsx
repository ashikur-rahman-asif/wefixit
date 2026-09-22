"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";

import { BlogTable } from "./_components/BlogTable";
import {
  useAdminBlogs,
  useUpdateBlog,
  useDeleteBlog,
} from "@/features/blogs/hooks/use-admin-blogs";
import { DeleteConfirmationModal } from "@/components/admin/DeleteConfirmationModal";
import { Pagination } from "@/components/ui/pagination";

import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";

function BlogsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const [blogToDelete, setBlogToDelete] = useState<number | null>(null);
  const [pendingStatuses, setPendingStatuses] = useState<Record<number, boolean>>({});
  const [pendingTop, setPendingTop] = useState<Record<number, boolean>>({});

  const { data: response, isLoading } = useAdminBlogs(page);
  const blogs = response?.data || [];
  const meta = response
    ? { currentPage: response.current_page, lastPage: response.last_page }
    : null;

  const updateMutation = useUpdateBlog();
  const deleteMutation = useDeleteBlog();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleDelete = (id: number) => {
    setBlogToDelete(id);
  };

  const handleConfirmDelete = () => {
    if (blogToDelete) {
      deleteMutation.mutate(blogToDelete, {
        onSettled: () => setBlogToDelete(null),
      });
    }
  };

  const handleToggleStatus = (id: number, newStatus: boolean) => {
    setPendingStatuses((prev) => {
      const next = { ...prev };
      const blog = blogs.find((b) => b.id === id);

      if (!blog) return next;

      if (blog.is_published === newStatus) {
        delete next[id];
      } else {
        next[id] = newStatus;
      }

      return next;
    });
  };

  const handleToggleTop = (id: number, newTop: boolean) => {
    setPendingTop((prev) => {
      const next = { ...prev };
      const blog = blogs.find((b) => b.id === id);

      if (!blog) return next;

      if (blog.is_top === newTop) {
        delete next[id];
      } else {
        next[id] = newTop;
      }

      return next;
    });
  };

  const handleSaveStatuses = async () => {
    const changedIds = new Set([...Object.keys(pendingStatuses), ...Object.keys(pendingTop)]);

    const promises = Array.from(changedIds).map((idStr) => {
      const id = Number(idStr);
      const blog = blogs.find((b) => b.id === id);
      if (!blog) return Promise.resolve();

      const is_published = pendingStatuses[id] ?? blog.is_published;
      const is_top = pendingTop[id] ?? blog.is_top;

      return updateMutation.mutateAsync({
        id,
        data: { is_published, is_top },
      });
    });

    try {
      await Promise.all(promises);
      setPendingStatuses({});
      setPendingTop({});
    } catch (error) {
      console.error(error);
    }
  };

  const hasPendingChanges =
    Object.keys(pendingStatuses).length > 0 || Object.keys(pendingTop).length > 0;

  return (
    <div className="bg-[#F8F9FB] min-h-screen p-6">
      <DeleteConfirmationModal
        isOpen={!!blogToDelete}
        onClose={() => setBlogToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Blog"
        description="Are you sure you want to delete this blog? This action cannot be undone."
        isDeleting={deleteMutation.isPending}
      />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-titleBlack leading-none mb-1">Blogs</h1>
          <p className="text-textGray text-sm">Manage your blog posts</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="h-11 px-5 bg-brand text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Blog
        </Link>
      </div>

      <BlogTable
        blogs={blogs}
        pendingStatuses={pendingStatuses}
        pendingTop={pendingTop}
        isLoading={isLoading}
        isDeleting={deleteMutation.isPending}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        onToggleTop={handleToggleTop}
      />

      {meta && meta.lastPage > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={meta.currentPage}
            totalPages={meta.lastPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {hasPendingChanges && (
        <div className="fixed bottom-0 left-0 lg:left-64 right-0 p-4 bg-white border-t border-gray-200 z-40 flex items-center justify-end gap-3 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <button
            onClick={() => {
              setPendingStatuses({});
              setPendingTop({});
            }}
            className="h-11 px-6 bg-gray-50 text-titleBlack rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveStatuses}
            disabled={updateMutation.isPending}
            className="h-11 px-6 bg-brand text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}

      <div className="h-24"></div>
    </div>
  );
}

export default function BlogsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[400px] items-center justify-center">
          <Loader size="lg" />
        </div>
      }
    >
      <BlogsContent />
    </Suspense>
  );
}
