"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BlogCategory } from "@/features/blogs/types/blog.types";
import { Edit2, Trash2 } from "lucide-react";

interface BlogCategoryTableProps {
  categories: BlogCategory[];
  isLoading: boolean;
  isDeleting: boolean;
  onEdit: (category: BlogCategory) => void;
  onDelete: (id: number) => void;
}

export function BlogCategoryTable({
  categories,
  isLoading,
  isDeleting,
  onEdit,
  onDelete,
}: BlogCategoryTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <Table>
        <TableHeader className="bg-[#F8F9FB] border-b border-gray-100">
          <TableRow className="border-none hover:bg-transparent">
            <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
              Name
            </TableHead>
            <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-50">
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={2}
                className="h-32 text-center text-gray-600 font-medium">
                Loading categories...
              </TableCell>
            </TableRow>
          ) : categories.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={2}
                className="h-32 text-center text-gray-600 font-medium">
                No categories found. Add one to get started.
              </TableCell>
            </TableRow>
          ) : (
            categories.map((category) => (
              <TableRow
                key={category.id}
                className="hover:bg-gray-50/50 border-none transition-colors">
                <TableCell className="px-6 py-4 font-semibold text-titleBlack text-sm">
                  {category.name}
                  <div className="text-[13px] text-gray-500 font-normal mt-0.5">
                    {category.slug}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(category)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:text-brand hover:bg-brand/10 transition-colors cursor-pointer"
                      title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(category.id)}
                      disabled={isDeleting}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50 cursor-pointer"
                      title="Delete">
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
