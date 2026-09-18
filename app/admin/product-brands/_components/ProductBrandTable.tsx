"use client";

import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminProductBrand } from "@/types/admin";
import { Edit2, Image as ImageIcon, Trash2 } from "lucide-react";
import Image from "next/image";

interface ProductBrandTableProps {
  brands: AdminProductBrand[];
  pendingStatuses: Record<number, boolean>;
  isLoading: boolean;
  isDeleting: boolean;
  onEdit: (brand: AdminProductBrand) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, currentStatus: boolean) => void;
}

export function ProductBrandTable({
  brands,
  pendingStatuses,
  isLoading,
  isDeleting,
  onEdit,
  onDelete,
  onToggleStatus,
}: ProductBrandTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <Table>
        <TableHeader className="bg-[#F8F9FB] border-b border-gray-100">
          <TableRow className="border-none hover:bg-transparent">
            <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto w-24">
              Icon
            </TableHead>
            <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
              Name
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
              <TableCell
                colSpan={4}
                className="h-32 text-center text-gray-600 font-medium">
                Loading brands...
              </TableCell>
            </TableRow>
          ) : brands.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="h-32 text-center text-gray-600 font-medium">
                No brands found. Add one to get started.
              </TableCell>
            </TableRow>
          ) : (
            brands.map((brand) => (
              <TableRow
                key={brand.id}
                className="hover:bg-gray-50/50 border-none transition-colors">
                <TableCell className="px-6 py-4">
                  <div className="w-10 h-10 rounded-lg border border-gray-100 overflow-hidden flex items-center justify-center bg-gray-50">
                    {brand.icon ? (
                      <Image
                        src={brand.icon}
                        alt={brand.name}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-gray-600 font-medium" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 font-semibold text-titleBlack text-sm">
                  {brand.name}
                  <div className="text-xs text-textGray font-normal mt-0.5">
                    {brand.slug}
                  </div>
                </TableCell>

                <TableCell className="px-6 py-4">
                  <Switch
                    checked={
                      pendingStatuses[brand.id] ?? Boolean(brand.is_active)
                    }
                    onCheckedChange={(checked) =>
                      onToggleStatus(brand.id, checked)
                    }
                    className="data-[state=checked]:bg-brand cursor-pointer"
                  />
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(brand)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 font-medium hover:text-brand hover:bg-brand/10 transition-colors cursor-pointer"
                      title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(brand.id)}
                      disabled={isDeleting}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 font-medium hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50 cursor-pointer"
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
