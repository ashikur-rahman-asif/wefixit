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
import { AdminService } from "@/types/admin";
import { Edit2, Image as ImageIcon, Trash2 } from "lucide-react";
import Image from "next/image";

interface ServiceTableProps {
  services: AdminService[];
  pendingStatuses: Record<number, boolean>;
  isLoading: boolean;
  isDeleting: boolean;
  onEdit: (service: AdminService) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, currentStatus: boolean) => void;
}

export function ServiceTable({
  services,
  pendingStatuses,
  isLoading,
  isDeleting,
  onEdit,
  onDelete,
  onToggleStatus,
}: ServiceTableProps) {
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
              Slug
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
              <TableCell colSpan={5} className="h-32 text-center text-gray-600 font-medium">
                Loading services...
              </TableCell>
            </TableRow>
          ) : services.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-32 text-center text-gray-600 font-medium">
                No services found. Add one to get started.
              </TableCell>
            </TableRow>
          ) : (
            services.map((service) => (
              <TableRow
                key={service.id}
                className="hover:bg-gray-50/50 border-none transition-colors"
              >
                <TableCell className="px-6 py-4">
                  <div className="w-10 h-10 rounded-lg border border-gray-100 overflow-hidden flex items-center justify-center bg-gray-50">
                    {service.icon ? (
                      <Image
                        src={service.icon}
                        alt={service.name}
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
                  {service.name}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-600 font-medium text-sm">
                  {service.slug}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Switch
                    checked={pendingStatuses[service.id] ?? Boolean(service.isActive)}
                    onCheckedChange={(checked: boolean) => onToggleStatus(service.id, checked)}
                    className="data-[state=checked]:bg-brand cursor-pointer"
                  />
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(service)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 font-medium hover:text-brand hover:bg-brand/10 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(service.id)}
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
