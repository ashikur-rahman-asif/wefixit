"use client";

import { AdminDevice } from "@/types/admin";
import { Plus } from "lucide-react";
import { useState } from "react";

import { DeviceFormModal } from "./_components/DeviceFormModal";
import { type DeviceFormData } from "@/validators/admin";
import { DeviceTable } from "./_components/DeviceTable";
import {
  useDevices,
  useCreateDevice,
  useUpdateDevice,
  useDeleteDevice,
} from "@/features/devices/hooks/use-admin-devices";
import { DeleteConfirmationModal } from "@/components/admin/DeleteConfirmationModal";

export default function DevicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState<AdminDevice | null>(null);
  const [deviceToDelete, setDeviceToDelete] = useState<number | null>(null);
  const [pendingStatuses, setPendingStatuses] = useState<Record<number, boolean>>({});
  const [modalKey, setModalKey] = useState(0);

  const { data: response, isLoading } = useDevices();
  const devices = response?.data || [];

  const createMutation = useCreateDevice();
  const updateMutation = useUpdateDevice();
  const deleteMutation = useDeleteDevice();

  const openAddModal = () => {
    setEditingDevice(null);
    setModalKey((k) => k + 1);
    setIsModalOpen(true);
  };

  const openEditModal = (device: AdminDevice) => {
    setEditingDevice(device);
    setModalKey((k) => k + 1);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: DeviceFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.slug) formData.append("slug", data.slug);
    formData.append("isActive", data.isActive ? "1" : "0");

    if (data.icon && data.icon instanceof File) {
      formData.append("icon", data.icon);
    }

    if (editingDevice) {
      updateMutation.mutate(
        { id: editingDevice.id, data: formData },
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
    setDeviceToDelete(id);
  };

  const handleConfirmDelete = () => {
    if (deviceToDelete) {
      deleteMutation.mutate(deviceToDelete, {
        onSettled: () => setDeviceToDelete(null),
      });
    }
  };

  const handleToggleStatus = (id: number, newStatus: boolean) => {
    setPendingStatuses((prev) => {
      const next = { ...prev };
      const device = devices.find((d) => d.id === id);

      if (!device) return next;

      if (device.isActive === newStatus) {
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
      const device = devices.find((d) => d.id === id);
      if (!device) return Promise.resolve();

      const formData = new FormData();
      formData.append("name", device.name);
      if (device.slug) formData.append("slug", device.slug);
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
        isOpen={!!deviceToDelete}
        onClose={() => setDeviceToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Device"
        description="Are you sure you want to delete this device type? This action cannot be undone."
        isDeleting={deleteMutation.isPending}
      />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-titleBlack leading-none mb-1">Devices</h1>
          <p className="text-textGray text-sm">
            Manage device types for the catalog (e.g., Phones, Tablets)
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="h-11 px-5 bg-brand text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Device
        </button>
      </div>

      <DeviceTable
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

      <DeviceFormModal
        key={modalKey}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        editingDevice={editingDevice}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
