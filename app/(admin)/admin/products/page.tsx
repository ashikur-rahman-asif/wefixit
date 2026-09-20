"use client";

import { Plus } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

import { ProductTable } from "./_components/ProductTable";
import { ProductFilters } from "./_components/ProductFilters";
import {
  useAdminProducts,
  useUpdateProduct,
  useDeleteProduct,
} from "@/features/products/hooks/use-admin-products";
import { DeleteConfirmationModal } from "@/components/admin/DeleteConfirmationModal";
import { Pagination } from "@/components/ui/pagination";

import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";

function ProductsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const brand = searchParams.get("brand") || "";
  const device = searchParams.get("device") || "";
  const status = searchParams.get("status") || "";
  const sort = searchParams.get("sort") || "";

  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [pendingStatuses, setPendingStatuses] = useState<Record<number, boolean>>({});
  const [pendingFeatured, setPendingFeatured] = useState<Record<number, boolean>>({}); 

  const { data: response, isLoading, isFetching } = useAdminProducts({ 
    page, 
    search,
    category,
    brand,
    device,
    status,
    sort,
  });
  const products = response?.data || [];
  const meta = response?.meta;

  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleDelete = (id: number) => {
    setProductToDelete(id);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteMutation.mutate(productToDelete, {
        onSettled: () => setProductToDelete(null),
      });
    }
  };

  const handleToggleStatus = (id: number, newStatus: boolean) => {
    setPendingStatuses((prev) => {
      const next = { ...prev };
      const product = products.find((p) => p.id === id);

      if (!product) return next;

      if (product.is_active === newStatus) {
        delete next[id];
      } else {
        next[id] = newStatus;
      }

      return next;
    });
  };

  const handleToggleFeatured = (id: number, newFeatured: boolean) => {
    setPendingFeatured((prev) => {
      const next = { ...prev };
      const product = products.find((p) => p.id === id);

      if (!product) return next;

      if (product.is_featured === newFeatured) {
        delete next[id];
      } else {
        next[id] = newFeatured;
      }

      return next;
    });
  };

  const handleSaveStatuses = async () => {
    
    const changedIds = new Set([
      ...Object.keys(pendingStatuses).map(Number),
      ...Object.keys(pendingFeatured).map(Number),
    ]);

    const promises = [...changedIds].map((id) => {
      const product = products.find((p) => p.id === id);
      if (!product) return Promise.resolve();

      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("slug", product.slug);
      formData.append("price", product.price.toString());
      if (product.product_category_id) formData.append("categoryId", product.product_category_id.toString());
      if (product.product_brand_id) formData.append("brandId", product.product_brand_id.toString());
      if (product.product_device_id) formData.append("deviceId", product.product_device_id.toString());

      const newStatus = pendingStatuses[id] ?? product.is_active;
      const newFeatured = pendingFeatured[id] ?? product.is_featured;
      formData.append("isActive", newStatus ? "1" : "0");
      formData.append("isFeatured", newFeatured ? "1" : "0");

      return updateMutation.mutateAsync({ id, data: formData });
    });

    try {
      await Promise.all(promises);
      setPendingStatuses({});
      setPendingFeatured({});
    } catch (error) {
      console.error(error);
    }
  };

  const hasPendingChanges =
    Object.keys(pendingStatuses).length > 0 ||
    Object.keys(pendingFeatured).length > 0;

  return (
    <div className="p-6 md:p-10 max-w-[1600px] mx-auto min-h-screen">
      <DeleteConfirmationModal
        isOpen={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        isDeleting={deleteMutation.isPending}
      />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-[28px] md:text-[32px] font-bold text-titleBlack leading-tight tracking-tight">
            Products
          </h1>
          <p className="text-textGray mt-2 text-[15px] font-medium max-w-2xl leading-relaxed">
            Manage all your store products, update inventory, pricing, and active status.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="h-11 px-5 bg-brand text-white rounded-xl text-[15px] font-bold hover:bg-brand/90 transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      <ProductFilters />

      <ProductTable
        products={products}
        pendingStatuses={pendingStatuses}
        pendingFeatured={pendingFeatured}
        isLoading={isLoading}
        isFetching={isFetching}
        isDeleting={deleteMutation.isPending}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        onToggleFeatured={handleToggleFeatured}
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
              setPendingFeatured({});
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

      {}
      <div className="h-24"></div>

    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[400px] items-center justify-center">
          <Loader size="lg" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
