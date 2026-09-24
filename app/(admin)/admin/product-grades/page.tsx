"use client";

import { ProductGrade } from "@/types/admin";
import { Plus } from "lucide-react";
import { useState } from "react";

import { GradeFormModal } from "./_components/GradeFormModal";
import { type GradeFormData } from "@/features/product-grades/schemas/product-grade.schema";
import { GradeTable } from "./_components/GradeTable";
import {
  useCreateProductGrade,
  useDeleteProductGrade,
  useProductGrades,
  useUpdateProductGrade,
} from "@/features/product-grades/hooks/use-admin-product-grades";
import { DeleteConfirmationModal } from "@/components/admin/DeleteConfirmationModal";

export default function ProductGradesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGrade, setEditingGrade] = useState<ProductGrade | null>(null);
  const [gradeToDelete, setGradeToDelete] = useState<number | null>(null);
  const [modalKey, setModalKey] = useState(0);

  const { data: grades, isLoading } = useProductGrades();
  const createMutation = useCreateProductGrade();
  const updateMutation = useUpdateProductGrade();
  const deleteMutation = useDeleteProductGrade();

  const openAddModal = () => {
    setEditingGrade(null);
    setModalKey((k) => k + 1);
    setIsModalOpen(true);
  };

  const openEditModal = (grade: ProductGrade) => {
    setEditingGrade(grade);
    setModalKey((k) => k + 1);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: GradeFormData) => {
    if (editingGrade) {
      updateMutation.mutate({ id: editingGrade.id, data });
    } else {
      createMutation.mutate(data);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setGradeToDelete(id);
  };

  const handleConfirmDelete = () => {
    if (gradeToDelete) {
      deleteMutation.mutate(gradeToDelete, {
        onSettled: () => setGradeToDelete(null),
      });
    }
  };

  return (
    <div className="bg-[#F8F9FB] min-h-screen p-6">
      <DeleteConfirmationModal
        isOpen={!!gradeToDelete}
        onClose={() => setGradeToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Product Grade"
        description="Are you sure you want to delete this product grade? This action cannot be undone."
        isDeleting={deleteMutation.isPending}
      />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-titleBlack leading-none mb-1">
            Product Grades
          </h1>
          <p className="text-textGray text-sm">
            Manage product quality grades (e.g., Grade A, Grade B, Refurbished)
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="h-11 px-5 bg-brand text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Grade
        </button>
      </div>

      <GradeTable
        grades={grades}
        isLoading={isLoading}
        isDeleting={deleteMutation.isPending}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <GradeFormModal
        key={modalKey}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        editingGrade={editingGrade}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
