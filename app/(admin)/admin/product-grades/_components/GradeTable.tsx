"use client";

import { ProductGrade } from "@/types/admin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, Trash2 } from "lucide-react";

interface GradeTableProps {
  grades: ProductGrade[] | undefined;
  isLoading: boolean;
  isDeleting: boolean;
  onEdit: (grade: ProductGrade) => void;
  onDelete: (id: number) => void;
}

export function GradeTable({ grades, isLoading, isDeleting, onEdit, onDelete }: GradeTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <Table>
        <TableHeader className="bg-[#F8F9FB] border-b border-gray-100">
          <TableRow className="border-none hover:bg-transparent">
            <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
              Name
            </TableHead>
            <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
              Description
            </TableHead>
            <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
              Status
            </TableHead>
            <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-50">
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="h-32 text-center text-gray-600 font-medium">
                Loading product grades...
              </TableCell>
            </TableRow>
          ) : grades?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-32 text-center text-gray-600 font-medium">
                No product grades found. Add one to get started.
              </TableCell>
            </TableRow>
          ) : (
            grades?.map((grade) => (
              <TableRow
                key={grade.id}
                className="hover:bg-gray-50/50 border-none transition-colors"
              >
                <TableCell className="px-6 py-4 font-semibold text-titleBlack text-sm">
                  {grade.name}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-600 font-medium text-sm max-w-xs truncate">
                  {grade.description || (
                    <span className="text-gray-300 italic">No description</span>
                  )}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      grade.isActive
                        ? "bg-green-50 text-green-600"
                        : "bg-gray-100 text-gray-600 font-medium"
                    }`}
                  >
                    {grade.isActive ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(grade)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 font-medium hover:text-brand hover:bg-brand/10 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(grade.id)}
                      disabled={isDeleting}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 font-medium hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
