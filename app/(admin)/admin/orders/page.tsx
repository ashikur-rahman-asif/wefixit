"use client";

import { useState } from "react";

import { DeleteConfirmationModal } from "@/components/admin/DeleteConfirmationModal";
import { Loader } from "@/components/ui/loader";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAdminOrders,
  useDeleteOrderList,
  useOrdersFilter,
} from "@/features/orders/hooks/use-admin-orders";
import { cn, getOrderStatusColor, getPaymentStatusColor } from "@/lib/utils";
import dayjs from "dayjs";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Suspense } from "react";

function AdminOrdersContent() {
  const router = useRouter();
  const {
    perPage,
    status,
    paymentStatus,
    searchQuery,
    setSearchQuery,
    queryParams,
    handleFilterChange,
  } = useOrdersFilter();

  const { data, isLoading } = useAdminOrders(queryParams);
  const deleteMutation = useDeleteOrderList();

  const orders = data?.data || [];
  const meta = data?.meta;

  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);

  const handleConfirmDelete = () => {
    if (orderToDelete) {
      deleteMutation.mutate(orderToDelete, {
        onSettled: () => setOrderToDelete(null),
      });
    }
  };

  return (
    <div className="bg-[#F8F9FB] min-h-screen p-6">
      <DeleteConfirmationModal
        isOpen={!!orderToDelete}
        onClose={() => setOrderToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Order"
        description={`Are you sure you want to delete order ${orderToDelete}? This action cannot be undone.`}
        isDeleting={deleteMutation.isPending}
      />

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[28px] font-bold text-titleBlack leading-none">
          Orders Management
        </h1>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-6 flex flex-col lg:flex-row items-center justify-between gap-4 border-b border-gray-100">
          <div className="flex w-full lg:w-auto items-center gap-4 flex-wrap">
            <div className="w-full md:w-64">
              <Input
                type="text"
                placeholder="Search by ID, Name, Email..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleFilterChange("search", e.target.value);
                }}
                className="!py-0 h-10 rounded-lg text-sm border-gray-200"
                label={""}
              />
            </div>

            <Select
              value={status}
              onValueChange={(val) => handleFilterChange("status", val)}>
              <SelectTrigger className="w-full md:w-[150px] h-10 border-gray-200 text-titleBlack">
                <SelectValue placeholder="Status">
                  {status === "all"
                    ? "All Status"
                    : status === "pending_payment"
                      ? "Pending"
                      : status === "processing"
                        ? "Processing"
                        : status === "completed"
                          ? "Completed"
                          : status === "delivered"
                            ? "Delivered"
                            : status === "cancelled"
                              ? "Cancelled"
                              : "Status"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                <SelectItem value="all" label="All Status">
                  All Status
                </SelectItem>
                <SelectItem value="pending_payment" label="Pending">
                  Pending
                </SelectItem>
                <SelectItem value="processing" label="Processing">
                  Processing
                </SelectItem>
                <SelectItem value="completed" label="Completed">
                  Completed
                </SelectItem>
                <SelectItem value="delivered" label="Delivered">
                  Delivered
                </SelectItem>
                <SelectItem value="cancelled" label="Cancelled">
                  Cancelled
                </SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={paymentStatus}
              onValueChange={(val) => handleFilterChange("paymentStatus", val)}>
              <SelectTrigger className="w-full md:w-[150px] h-10 border-gray-200 text-titleBlack">
                <SelectValue placeholder="Payment">
                  {paymentStatus === "all"
                    ? "All Payment"
                    : paymentStatus === "pending"
                      ? "Pending"
                      : paymentStatus === "paid"
                        ? "Paid"
                        : paymentStatus === "failed"
                          ? "Failed"
                          : paymentStatus === "refunded"
                            ? "Refunded"
                            : "Payment"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" label="All Payment">
                  All Payment
                </SelectItem>
                <SelectItem value="pending" label="Pending">
                  Pending
                </SelectItem>
                <SelectItem value="paid" label="Paid">
                  Paid
                </SelectItem>
                <SelectItem value="failed" label="Failed">
                  Failed
                </SelectItem>
                <SelectItem value="refunded" label="Refunded">
                  Refunded
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#F8F9FB] border-b border-gray-100">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                  Order Id
                </TableHead>
                <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                  Customer
                </TableHead>
                <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                  Date
                </TableHead>
                <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                  Items
                </TableHead>
                <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                  Total
                </TableHead>
                <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                  Payment
                </TableHead>
                <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                  Status
                </TableHead>
                <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto text-right">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-50 relative">
              {isLoading && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-32 text-center text-textGray">
                    <div className="flex items-center justify-center">
                      <Loader size="md" />
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && orders.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="px-6 py-12 text-center text-gray-600 font-medium">
                    No orders found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
              {!isLoading &&
                orders.map((order) => (
                  <TableRow
                    key={order.id}
                    onClick={() =>
                      router.push(`/admin/orders/${order.reference}`)
                    }
                    className="hover:bg-gray-50/50 border-none transition-colors cursor-pointer">
                    <TableCell className="px-6 py-4 text-titleBlack text-sm font-semibold">
                      {order.reference}
                    </TableCell>
                    <TableCell className="px-6 py-4 font-semibold">
                      <div className="flex flex-col">
                        <span className="text-titleBlack font-semibold text-sm whitespace-nowrap">
                          {order.customerName}
                        </span>
                        <span className="text-textGray text-xs font-semibold whitespace-nowrap">
                          {order.email || "N/A"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-textGray text-sm font-semibold">
                      {dayjs(order.placedAt).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-textGray text-sm font-semibold">
                      {order.itemsCount} items
                    </TableCell>
                    <TableCell className="px-6 py-4 text-titleBlack text-sm font-semibold">
                      {order.currency.toUpperCase()}{" "}
                      {order.total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell className="px-6 py-4 font-semibold">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-semibold capitalize",
                          getPaymentStatusColor(order.paymentStatus),
                        )}>
                        {order.paymentStatusLabel}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4 font-semibold">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-semibold capitalize",
                          getOrderStatusColor(order.status),
                        )}>
                        {order.statusLabel}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4 font-semibold text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-titleBlack px-3 py-1.5 rounded-lg text-[13px] font-medium hover:bg-brand hover:text-white hover:border-brand shadow-sm transition-all duration-200 cursor-pointer">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          View
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOrderToDelete(order.reference);
                          }}
                          disabled={deleteMutation.isPending}
                          className="inline-flex items-center justify-center bg-white border border-gray-200 text-red-500 w-8 h-8 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-100 shadow-sm transition-all duration-200 cursor-pointer disabled:opacity-50"
                          title="Delete Order">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        {meta && meta.lastPage > 1 && (
          <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 text-sm text-textGray">
            <div className="flex items-center gap-3">
              <span>Show :</span>
              <Select
                value={perPage.toString()}
                onValueChange={(val) => handleFilterChange("perPage", val)}>
                <SelectTrigger className="w-[70px] h-9 border-gray-200 focus:ring-0 focus:ring-offset-0 text-titleBlack">
                  <SelectValue placeholder="15" />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span>Entries</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                disabled={meta.currentPage === 1}
                onClick={() =>
                  handleFilterChange("page", String(meta.currentPage - 1))
                }
                className="w-8 h-8 flex items-center justify-center rounded-lg text-textGray hover:bg-gray-100 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div className="flex">
                {Array.from({ length: meta.lastPage }, (_, i) => i + 1).map(
                  (p) => {
                    if (
                      p === 1 ||
                      p === meta.lastPage ||
                      (p >= meta.currentPage - 1 && p <= meta.currentPage + 1)
                    ) {
                      return (
                        <button
                          key={p}
                          onClick={() => handleFilterChange("page", String(p))}
                          className={cn(
                            "w-9 h-9 flex items-center justify-center font-medium transition-colors cursor-pointer",
                            meta.currentPage === p
                              ? "bg-brand text-white border border-brand z-10"
                              : "text-titleBlack border-t border-b border-r border-gray-200 hover:bg-gray-50",
                            p === 1 && "rounded-l-md border-l",
                            p === meta.lastPage && "rounded-r-md",
                          )}>
                          {p}
                        </button>
                      );
                    } else if (
                      p === meta.currentPage - 2 ||
                      p === meta.currentPage + 2
                    ) {
                      return (
                        <span
                          key={p}
                          className="w-9 h-9 flex items-center justify-center text-textGray border-t border-b border-r border-gray-200">
                          ...
                        </span>
                      );
                    }
                    return null;
                  },
                )}
              </div>
              <button
                disabled={meta.currentPage === meta.lastPage}
                onClick={() =>
                  handleFilterChange("page", String(meta.currentPage + 1))
                }
                className="w-8 h-8 flex items-center justify-center rounded-lg text-textGray hover:bg-gray-100 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminOrdersPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-center text-gray-600 font-medium">
          Loading orders...
        </div>
      }>
      <AdminOrdersContent />
    </Suspense>
  );
}
