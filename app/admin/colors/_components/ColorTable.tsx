"use client";

import { AdminColor } from "@/types/admin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Edit2, Trash2 } from "lucide-react";

interface ColorTableProps {
  colors: AdminColor[];
  pendingStatuses: Record<number, boolean>;
  isLoading: boolean;
  isDeleting: boolean;
  onEdit: (color: AdminColor) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, currentStatus: boolean) => void;
}

export function ColorTable({
  colors,
  pendingStatuses,
  isLoading,
  isDeleting,
  onEdit,
  onDelete,
  onToggleStatus,
}: ColorTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <Table>
        <TableHeader className="bg-[#F8F9FB] border-b border-gray-100">
          <TableRow className="border-none hover:bg-transparent">
            <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto w-24">
              Color
            </TableHead>
            <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
              Name
            </TableHead>
            <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
              Hex Code
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
                colSpan={5}
                className="h-32 text-center text-gray-500 font-medium"
              >
                Loading colors...
              </TableCell>
            </TableRow>
          ) : colors.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-32 text-center text-gray-500 font-medium"
              >
                No colors found. Add one to get started.
              </TableCell>
            </TableRow>
          ) : (
            colors.map((color) => (
              <TableRow
                key={color.id}
                className="hover:bg-gray-50/50 border-none transition-colors"
              >
                <TableCell className="px-6 py-4">
                  <div 
                    className="w-8 h-8 rounded-full border border-gray-200 shadow-sm"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                </TableCell>
                <TableCell className="px-6 py-4 font-semibold text-titleBlack text-sm">
                  {color.name}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-600 text-sm font-mono uppercase">
                  {color.hex}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Switch
                    checked={pendingStatuses[color.id] ?? Boolean(color.is_active)}
                    onCheckedChange={(checked) => onToggleStatus(color.id, checked)}
                    className="data-[state=checked]:bg-brand cursor-pointer"
                  />
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(color)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-brand hover:bg-brand/10 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(color.id)}
                      disabled={isDeleting}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50 cursor-pointer"
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
