"use client";

import { BlogCategory } from "@/features/blogs/types/blog.types";
import { Plus } from "lucide-react";
import { useState } from "react";

import { BlogCategoryFormModal } from "./_components/BlogCategoryFormModal";
import { type BlogCategoryFormData } from "@/validators/admin";
import { BlogCategoryTable } from "./_components/BlogCategoryTable";
import {
  useAdminBlogCategories,
  useCreateBlogCategory,
  useUpdateBlogCategory,
  useDeleteBlogCategory,
} from "@/features/blogs/hooks/use-admin-blog-categories";
import { DeleteConfirmationModal } from "@/components/admin/DeleteConfirmationModal";

import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";

function BlogCategoriesContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
  const [modalKey, setModalKey] = useState(0);

  const { data: categories = [], isLoading } = useAdminBlogCategories();

  const createMutation = useCreateBlogCategory();
  const updateMutation = useUpdateBlogCategory();
  const deleteMutation = useDeleteBlogCategory();

  const openAddModal = () => {
    setEditingCategory(null);
    setModalKey((k) => k + 1);
    setIsModalOpen(true);
  };

  const openEditModal = (category: BlogCategory) => {
    setEditingCategory(category);
    setModalKey((k) => k + 1);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: BlogCategoryFormData) => {
    if (editingCategory) {
      updateMutation.mutate(
        { id: editingCategory.id, data },
        {
          onSuccess: () => setIsModalOpen(false),
        },
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => setIsModalOpen(false),
      });
    }
  };

  const handleDelete = (id: number) => {
    setCategoryToDelete(id);
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      deleteMutation.mutate(categoryToDelete, {
        onSettled: () => setCategoryToDelete(null),
      });
    }
  };

  return (
    <div className="bg-[#F8F9FB] min-h-screen p-6">
      <DeleteConfirmationModal
        isOpen={!!categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Blog Category"
        description="Are you sure you want to delete this category? This action cannot be undone."
        isDeleting={deleteMutation.isPending}
      />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-titleBlack leading-none mb-1">
            Blog Categories
          </h1>
          <p className="text-textGray text-sm">Manage blog categories</p>
        </div>
        <button
          onClick={openAddModal}
          className="h-11 px-5 bg-brand text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <BlogCategoryTable
        categories={categories}
        isLoading={isLoading}
        isDeleting={deleteMutation.isPending}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <div className="h-24"></div>

      <BlogCategoryFormModal
        key={modalKey}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        editingCategory={editingCategory}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}

export default function BlogCategoriesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[400px] items-center justify-center">
          <Loader size="lg" />
        </div>
      }
    >
      <BlogCategoriesContent />
    </Suspense>
  );
}
