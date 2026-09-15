"use client";

import { AdminColor } from "@/types/admin";
import { Plus } from "lucide-react";
import { useState } from "react";

import { ColorFormModal } from "./_components/ColorFormModal";
import { type ColorFormData } from "@/validators/admin";
import { ColorTable } from "./_components/ColorTable";
import {
  useColors,
  useCreateColor,
  useUpdateColor,
  useDeleteColor,
} from "@/features/colors/hooks/use-admin-colors";
import { DeleteConfirmationModal } from "@/components/admin/DeleteConfirmationModal";

export default function ColorsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingColor, setEditingColor] = useState<AdminColor | null>(null);
  const [colorToDelete, setColorToDelete] = useState<number | null>(null);
  const [pendingStatuses, setPendingStatuses] = useState<Record<number, boolean>>({});

  const { data: response, isLoading } = useColors();
  const colors = response?.data || [];
  
  const createMutation = useCreateColor();
  const updateMutation = useUpdateColor();
  const deleteMutation = useDeleteColor();

  const openAddModal = () => {
    setEditingColor(null);
    setIsModalOpen(true);
  };

  const openEditModal = (color: AdminColor) => {
    setEditingColor(color);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: ColorFormData) => {
    const payload = {
      name: data.name,
      hex: data.hex,
      isActive: data.is_active,
    };

    if (editingColor) {
      updateMutation.mutate({ id: editingColor.id, data: payload }, {
        onSuccess: () => setIsModalOpen(false)
      });
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => setIsModalOpen(false)
      });
    }
  };

  const handleDelete = (id: number) => {
    setColorToDelete(id);
  };

  const handleConfirmDelete = () => {
    if (colorToDelete) {
      deleteMutation.mutate(colorToDelete, {
        onSettled: () => setColorToDelete(null),
      });
    }
  };

  const handleToggleStatus = (id: number, newStatus: boolean) => {
    setPendingStatuses((prev) => {
      const next = { ...prev };
      const color = colors.find((c) => c.id === id);

      if (!color) return next;

      if (color.is_active === newStatus) {
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
      return updateMutation.mutateAsync({ id, data: { isActive: newStatus } });
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
        isOpen={!!colorToDelete}
        onClose={() => setColorToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Color"
        description="Are you sure you want to delete this color? This action cannot be undone."
        isDeleting={deleteMutation.isPending}
      />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-titleBlack leading-none mb-1">
            Colors
          </h1>
          <p className="text-textGray text-sm">
            Manage product colors for the catalog
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="h-11 px-5 bg-brand text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Color
        </button>
      </div>

      <ColorTable
        colors={colors}
        pendingStatuses={pendingStatuses}
        isLoading={isLoading}
        isDeleting={deleteMutation.isPending}
        onEdit={openEditModal}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />

      {hasPendingChanges && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSaveStatuses}
            disabled={updateMutation.isPending}
            className="h-11 px-6 bg-brand text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-lg cursor-pointer"
          >
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}

      <ColorFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        editingColor={editingColor}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
