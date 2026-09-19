"use client";

import { AdminProductCategory } from "@/types/admin";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { ProductCategoryFormModal } from "./_components/ProductCategoryFormModal";
import { type ProductCategoryFormData } from "@/validators/admin";
import { ProductCategoryTable } from "./_components/ProductCategoryTable";
import {
  useProductCategories,
  useCreateProductCategory,
  useUpdateProductCategory,
  useDeleteProductCategory,
} from "@/features/products/hooks/use-admin-product-categories";
import { DeleteConfirmationModal } from "@/components/admin/DeleteConfirmationModal";
import { Pagination } from "@/components/ui/pagination";

import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";

function ProductCategoriesContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminProductCategory | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
  const [pendingStatuses, setPendingStatuses] = useState<Record<number, boolean>>({});

  const { data: response, isLoading } = useProductCategories({ page, search });
  const categories = response?.data || [];
  const meta = response?.meta;

  const createMutation = useCreateProductCategory();
  const updateMutation = useUpdateProductCategory();
  const deleteMutation = useDeleteProductCategory();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const openAddModal = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const openEditModal = (category: AdminProductCategory) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: ProductCategoryFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.slug) formData.append("slug", data.slug);
    formData.append("is_active", data.is_active ? "1" : "0");

    if (editingCategory) {
      updateMutation.mutate({ id: editingCategory.id, data: formData }, {
        onSuccess: () => setIsModalOpen(false)
      });
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => setIsModalOpen(false)
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

  const handleToggleStatus = (id: number, newStatus: boolean) => {
    setPendingStatuses((prev) => {
      const next = { ...prev };
      const category = categories.find((c) => c.id === id);

      if (!category) return next;

      if (category.is_active === newStatus) {
        delete next[id];
      } else {
        next[id] = newStatus;
      }

      return next;
    });
  };

  const handleSaveStatuses = async () => {
    const promises = Object.entries(pendingStatuses).map(([idStr, newStatus]) => {
      const id = Number(idStr);
      const category = categories.find((c) => c.id === id);
      if (!category) return Promise.resolve();
      
      const formData = new FormData();
      formData.append("name", category.name);
      if (category.slug) formData.append("slug", category.slug);
      formData.append("is_active", newStatus ? "1" : "0");
      
      return updateMutation.mutateAsync({ id, data: formData });
    });

    try {
      await Promise.all(promises);
      setPendingStatuses({});
    } catch (error) {
      console.error(error);
    }
  };

  const hasPendingChanges = Object.keys(pendingStatuses).length > 0;

  return (
    <div className="bg-[#F8F9FB] min-h-screen p-6">
      <DeleteConfirmationModal
        isOpen={!!categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Product Category"
        description="Are you sure you want to delete this category? This action cannot be undone."
        isDeleting={deleteMutation.isPending}
      />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-titleBlack leading-none mb-1">
            Product Categories
          </h1>
          <p className="text-textGray text-sm">
            Manage product categories for ecommerce
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="h-11 px-5 bg-brand text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <ProductCategoryTable
        categories={categories}
        pendingStatuses={pendingStatuses}
        isLoading={isLoading}
        isDeleting={deleteMutation.isPending}
        onEdit={openEditModal}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
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
            onClick={() => setPendingStatuses({})}
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

      {}
      <div className="h-24"></div>

      <ProductCategoryFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        editingCategory={editingCategory}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}

export default function ProductCategoriesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[400px] items-center justify-center">
          <Loader size="lg" />
        </div>
      }
    >
      <ProductCategoriesContent />
    </Suspense>
  );
}
