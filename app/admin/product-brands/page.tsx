"use client";

import { AdminProductBrand } from "@/types/admin";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { ProductBrandFormModal } from "./_components/ProductBrandFormModal";
import { type EcommerceBrandFormData } from "@/validators/admin";
import { ProductBrandTable } from "./_components/ProductBrandTable";
import {
  useProductBrands,
  useCreateProductBrand,
  useUpdateProductBrand,
  useDeleteProductBrand,
} from "@/features/products/hooks/use-admin-product-brands";
import { DeleteConfirmationModal } from "@/components/admin/DeleteConfirmationModal";
import { Pagination } from "@/components/ui/pagination";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";

function ProductBrandsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<AdminProductBrand | null>(null);
  const [brandToDelete, setBrandToDelete] = useState<number | null>(null);
  const [pendingStatuses, setPendingStatuses] = useState<Record<number, boolean>>({});

  const { data: response, isLoading } = useProductBrands({ page, search });
  const brands = response?.data || [];
  const meta = response?.meta;

  const createMutation = useCreateProductBrand();
  const updateMutation = useUpdateProductBrand();
  const deleteMutation = useDeleteProductBrand();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const openAddModal = () => {
    setEditingBrand(null);
    setIsModalOpen(true);
  };

  const openEditModal = (brand: AdminProductBrand) => {
    setEditingBrand(brand);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: EcommerceBrandFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.slug) formData.append("slug", data.slug);
    formData.append("is_active", data.is_active ? "1" : "0");

    if (editingBrand) {
      updateMutation.mutate({ id: editingBrand.id, data: formData }, {
        onSuccess: () => setIsModalOpen(false)
      });
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => setIsModalOpen(false)
      });
    }
  };

  const handleDelete = (id: number) => {
    setBrandToDelete(id);
  };

  const handleConfirmDelete = () => {
    if (brandToDelete) {
      deleteMutation.mutate(brandToDelete, {
        onSettled: () => setBrandToDelete(null),
      });
    }
  };

  const handleToggleStatus = (id: number, newStatus: boolean) => {
    setPendingStatuses((prev) => {
      const next = { ...prev };
      const brand = brands.find((b) => b.id === id);

      if (!brand) return next;

      if (brand.is_active === newStatus) {
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
      const brand = brands.find((b) => b.id === id);
      if (!brand) return Promise.resolve();
      
      const formData = new FormData();
      formData.append("name", brand.name);
      if (brand.slug) formData.append("slug", brand.slug);
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
        isOpen={!!brandToDelete}
        onClose={() => setBrandToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Product Brand"
        description="Are you sure you want to delete this brand? This action cannot be undone."
        isDeleting={deleteMutation.isPending}
      />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-titleBlack leading-none mb-1">
            Product Brands
          </h1>
          <p className="text-textGray text-sm">
            Manage product brands for ecommerce
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="h-11 px-5 bg-brand text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Brand
        </button>
      </div>

      <ProductBrandTable
        brands={brands}
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

      <ProductBrandFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        editingBrand={editingBrand}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}

export default function ProductBrandsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[400px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand" />
        </div>
      }
    >
      <ProductBrandsContent />
    </Suspense>
  );
}
