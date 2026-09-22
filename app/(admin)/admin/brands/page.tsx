"use client";

import { AdminBrand } from "@/types/admin";
import { Plus } from "lucide-react";
import { useState } from "react";

import { BrandFormModal } from "./_components/BrandFormModal";
import { type BrandFormData } from "@/validators/admin";
import { BrandTable } from "./_components/BrandTable";
import {
  useBrands,
  useCreateBrand,
  useUpdateBrand,
  useDeleteBrand,
} from "@/features/brands/hooks/use-admin-brands";
import { useDevices } from "@/features/devices/hooks/use-admin-devices";
import { DeleteConfirmationModal } from "@/components/admin/DeleteConfirmationModal";

export default function BrandsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<AdminBrand | null>(null);
  const [brandToDelete, setBrandToDelete] = useState<number | null>(null);
  const [pendingStatuses, setPendingStatuses] = useState<Record<number, boolean>>({});

  const { data: response, isLoading } = useBrands();
  const brands = response?.data || [];

  const { data: devicesData } = useDevices();
  const devices = devicesData?.data || [];

  const createMutation = useCreateBrand();
  const updateMutation = useUpdateBrand();
  const deleteMutation = useDeleteBrand();

  const openAddModal = () => {
    setEditingBrand(null);
    setIsModalOpen(true);
  };

  const openEditModal = (brand: AdminBrand) => {
    setEditingBrand(brand);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: BrandFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.slug) formData.append("slug", data.slug);
    if (data.deviceName) formData.append("deviceName", data.deviceName);
    formData.append("isActive", data.is_active ? "1" : "0");

    if (data.deviceIds && data.deviceIds.length > 0) {
      data.deviceIds.forEach((id: number) => formData.append("deviceIds[]", id.toString()));
    }

    if (data.icon && data.icon instanceof File) {
      formData.append("icon", data.icon);
    }

    if (editingBrand) {
      updateMutation.mutate(
        { id: editingBrand.id, data: formData },
        {
          onSuccess: () => setIsModalOpen(false),
        },
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => setIsModalOpen(false),
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
      if (brand.device_name) formData.append("deviceName", brand.device_name);
      formData.append("isActive", newStatus ? "1" : "0");

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
        title="Delete Brand"
        description="Are you sure you want to delete this brand? This action cannot be undone."
        isDeleting={deleteMutation.isPending}
      />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-titleBlack leading-none mb-1">Brands</h1>
          <p className="text-textGray text-sm">Manage product brands for the catalog</p>
        </div>
        <button
          onClick={openAddModal}
          className="h-11 px-5 bg-brand text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Brand
        </button>
      </div>

      <BrandTable
        brands={brands}
        devices={devices}
        pendingStatuses={pendingStatuses}
        isLoading={isLoading}
        isDeleting={deleteMutation.isPending}
        onEdit={openEditModal}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />

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

      <BrandFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        editingBrand={editingBrand}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
