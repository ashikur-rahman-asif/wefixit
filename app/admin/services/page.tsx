"use client";

import { AdminService } from "@/types/admin";
import { Plus } from "lucide-react";
import { useState } from "react";

import { ServiceFormModal } from "./_components/ServiceFormModal";
import { type ServiceFormData } from "@/validators/admin";
import { ServiceTable } from "./_components/ServiceTable";
import {
  useServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
} from "@/features/services/hooks/use-admin-services";
import { DeleteConfirmationModal } from "@/components/admin/DeleteConfirmationModal";

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<AdminService | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<number | null>(null);
  const [pendingStatuses, setPendingStatuses] = useState<Record<number, boolean>>({});

  const { data: response, isLoading } = useServices();
  const services = response?.data || [];
  
  const createMutation = useCreateService();
  const updateMutation = useUpdateService();
  const deleteMutation = useDeleteService();

  const openAddModal = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const openEditModal = (service: AdminService) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: ServiceFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.slug) formData.append("slug", data.slug);
    formData.append("isActive", data.isActive ? "1" : "0");
    
    if (data.deviceIds && data.deviceIds.length > 0) {
      data.deviceIds.forEach((id: number) => formData.append("deviceIds[]", id.toString()));
    }
    
    if (data.icon && data.icon instanceof File) {
      formData.append("icon", data.icon);
    }

    if (editingService) {
      updateMutation.mutate({ id: editingService.id, data: formData }, {
        onSuccess: () => setIsModalOpen(false)
      });
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => setIsModalOpen(false)
      });
    }
  };

  const handleDelete = (id: number) => {
    setServiceToDelete(id);
  };

  const handleConfirmDelete = () => {
    if (serviceToDelete) {
      deleteMutation.mutate(serviceToDelete, {
        onSettled: () => setServiceToDelete(null),
      });
    }
  };

  const handleToggleStatus = (id: number, newStatus: boolean) => {
    setPendingStatuses((prev) => {
      const next = { ...prev };
      const service = services.find((c) => c.id === id);

      if (!service) return next;

      if (service.isActive === newStatus) {
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
      const service = services.find((s) => s.id === id);
      if (!service) return Promise.resolve();

      const formData = new FormData();
      formData.append("name", service.name);
      if (service.slug) formData.append("slug", service.slug);
      formData.append("isActive", newStatus ? "1" : "0");
      if (service.deviceIds && service.deviceIds.length > 0) {
        service.deviceIds.forEach((deviceId) => formData.append("deviceIds[]", deviceId.toString()));
      }

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
        isOpen={!!serviceToDelete}
        onClose={() => setServiceToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Service"
        description="Are you sure you want to delete this service? This action cannot be undone."
        isDeleting={deleteMutation.isPending}
      />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-titleBlack leading-none mb-1">
            Services
          </h1>
          <p className="text-textGray text-sm">
            Manage product services for the catalog
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="h-11 px-5 bg-brand text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      <ServiceTable
        services={services}
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

      <ServiceFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        editingService={editingService}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
