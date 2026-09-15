"use client";

import { useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { AdminRepair } from "@/types/admin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRepairs } from "@/features/repairs/hooks/use-admin-repairs";
import { Trash2 } from "lucide-react";
import { DeleteConfirmationModal } from "@/components/admin/DeleteConfirmationModal";
import { getOrderStatusColor } from "@/lib/utils";
import { useDeleteRepair } from "@/features/repairs/hooks/use-admin-repair";

export default function AdminRepairsPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [repairToDelete, setRepairToDelete] = useState<string | null>(null);

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const { data, isLoading } = useRepairs({
    page,
    perPage: 15,
    search: search || undefined,
    status: status !== "all" ? status : undefined,
  });

  const deleteMutation = useDeleteRepair(repairToDelete || "");

  const handleFilterChange = (val: string | null) => {
    if (val) setStatus(val);
    setPage(1);
  };

  const repairs = data?.data || [];
  const meta = data?.meta;

  const handleDelete = () => {
    if (!repairToDelete) return;
    deleteMutation.mutate(undefined, {
      onSuccess: () => setRepairToDelete(null),
    });
  };

  return (
    <div className="p-6 md:p-10 max-w-[1600px] mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-[28px] md:text-[32px] font-bold text-titleBlack leading-tight tracking-tight">
            Repairs
          </h1>
          <p className="text-textGray mt-2 text-[15px] font-medium max-w-2xl leading-relaxed">
            Manage all device repair requests, update their status, and track progress.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 font-medium"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                handleSearch(e.target.value);
              }}
              placeholder="Search by reference, name, email or model..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all placeholder:font-normal"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar shrink-0">
            <Select value={status} onValueChange={handleFilterChange}>
              <SelectTrigger className="w-[160px] h-10 border-gray-200 text-titleBlack font-semibold shrink-0">
                <SelectValue placeholder="Status">
                  {status === "all" ? "All Status" : status.replace("_", " ")}
                </SelectValue>
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                <SelectItem value="all" label="All Status">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="picked_up">Picked Up</SelectItem>
                <SelectItem value="received">Received</SelectItem>
                <SelectItem value="diagnosing">Diagnosing</SelectItem>
                <SelectItem value="repairing">Repairing</SelectItem>
                <SelectItem value="ready_for_delivery">Ready For Delivery</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow className="border-b-gray-100 hover:bg-transparent">
                <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                  Reference
                </TableHead>
                <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                  Customer
                </TableHead>
                <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                  Device & Model
                </TableHead>
                <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                  Scheduled
                </TableHead>
                <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                  Total
                </TableHead>
                <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                  Status
                </TableHead>
                <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-[400px] text-center">
                    <div className="flex flex-col items-center justify-center text-textGray">
                      <div className="w-8 h-8 border-4 border-brand/30 border-t-brand rounded-full animate-spin mb-4" />
                      <p className="font-medium">Loading repairs...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : repairs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-[400px] text-center">
                    <div className="flex flex-col items-center justify-center text-textGray">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-gray-600 font-medium" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <p className="font-medium text-titleBlack text-lg">No repairs found</p>
                      <p className="text-sm mt-1">Try adjusting your filters or search query.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                repairs.map((repair: AdminRepair) => (
                  <TableRow
                    key={repair.id}
                    className="border-b-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <TableCell className="px-6 py-4">
                      <div className="font-bold text-titleBlack">#{repair.reference}</div>
                      <div className="text-textGray text-xs font-semibold mt-0.5">
                        {repair.date}
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="font-bold text-titleBlack text-sm whitespace-nowrap">{repair.customerName}</div>
                      <div className="text-textGray text-xs font-semibold whitespace-nowrap">{repair.email || "N/A"}</div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="font-bold text-titleBlack text-sm">{repair.device} - {repair.brand}</div>
                      <div className="text-textGray text-xs font-semibold">{repair.modelName}</div>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-textGray text-sm font-semibold">
                      {repair.scheduledDate ? dayjs(repair.scheduledDate).format("MMM D, YYYY") : "N/A"}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-titleBlack text-sm font-semibold">
                      ${repair.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="px-6 py-4 font-semibold">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getOrderStatusColor(repair.status)}`}>
                        {repair.statusLabel}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4 font-semibold text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/repair-orders/${repair.reference}`}
                          className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-titleBlack px-3 py-1.5 rounded-lg text-[13px] font-medium hover:bg-brand hover:text-white hover:border-brand shadow-sm transition-all duration-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View
                        </Link>
                        <button
                          onClick={() => setRepairToDelete(repair.reference)}
                          className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-red-500 px-3 py-1.5 rounded-lg text-[13px] font-medium hover:bg-red-50 hover:border-red-200 shadow-sm transition-all duration-200 cursor-pointer"
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

        {meta && meta.lastPage > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm font-semibold text-textGray">
              Showing <span className="text-titleBlack">{meta.from}</span> to <span className="text-titleBlack">{meta.to}</span> of <span className="text-titleBlack">{meta.total}</span> repairs
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-titleBlack hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(meta.lastPage, p + 1))}
                disabled={page === meta.lastPage}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-titleBlack hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <DeleteConfirmationModal
        isOpen={!!repairToDelete}
        onClose={() => setRepairToDelete(null)}
        onConfirm={handleDelete}
        title="Delete Repair"
        description={`Are you sure you want to delete repair #${repairToDelete}? This action cannot be undone and will remove all related tracking history.`}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}
