"use client";

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
import { RecentOrder } from "@/types/admin";
import { OrderItem } from "@/types/admin";
import Link from "next/link";
import { cn, getOrderStatusColor, getPaymentStatusColor } from "@/lib/utils";
import dayjs from "dayjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function RecentOrdersTable({
  recentOrders,
}: {
  recentOrders: RecentOrder[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredOrders = recentOrders.filter((order) => {
    const q = searchQuery.toLowerCase();
    return (
      (order.reference || "").toLowerCase().includes(q) ||
      (order.customerName || "").toLowerCase().includes(q) ||
      (order.email || "").toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-titleBlack rounded-full"></div>
          <h2 className="text-[18px] font-bold text-titleBlack">
            Recent Orders
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-full md:w-64 pt-2">
            <Input
              type="text"
              placeholder="ID, Name, Email..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              } }
              className="py-2 text-sm" label={""}            />
          </div>
          <button 
            onClick={() => router.push("/admin/orders")}
            className="bg-brand text-white px-4 py-2 rounded-lg text-[13px] font-medium hover:bg-blue-700 transition-colors cursor-pointer">
            View All Orders
          </button>
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
                Type
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                Items
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                Price
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                Paid
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                Status
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-50">
            {paginatedOrders.map((order, idx) => {
              const types = [
                { label: "Repaired", color: "#5b6cf9", bgColor: "#f0f2ff" },
                { label: "Pre-Owned", color: "#f76a17", bgColor: "#fff0e5" },
                { label: "New Device", color: "#fba518", bgColor: "#fff7e5" },
              ];
              const orderType = types[order.id % 3];

              return (
                <TableRow
                  key={idx}
                  onClick={() => router.push(`/admin/orders/${order.reference}`)}
                  className="hover:bg-gray-50/50 border-none transition-colors cursor-pointer">
                  <TableCell className="px-6 py-4 text-titleBlack text-sm font-semibold">
                    {order.reference}
                  </TableCell>
                  <TableCell className="px-6 py-4 font-semibold">
                    <div className="flex flex-col">
                      <span className="text-titleBlack font-semibold text-sm">
                        {order.customerName}
                      </span>
                      <span className="text-textGray text-xs font-semibold">
                        {order.email || "N/A"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-textGray text-sm font-semibold">
                    {dayjs(order.placedAt).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell className="px-6 py-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex items-center justify-center w-4 h-4 rounded-full"
                        style={{ backgroundColor: orderType.bgColor }}>
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: orderType.color }}></div>
                      </div>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: orderType.color }}>
                        {orderType.label}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-textGray text-sm font-semibold">
                    {order.itemsCount} items
                  </TableCell>
                  <TableCell className="px-6 py-4 text-titleBlack text-sm font-semibold">
                    $
                    {order.total.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className="px-6 py-4 font-semibold">
                    <span 
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-semibold capitalize tracking-wide",
                        getPaymentStatusColor(order.paymentStatus)
                      )}
                    >
                      {order.paymentStatus === "paid" ? "Yes" : "No"}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 font-semibold">
                    <span 
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-semibold capitalize tracking-wide",
                        getOrderStatusColor(order.status)
                      )}
                    >
                      {order.status === "pending_payment"
                        ? "Pending"
                        : order.status}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 font-semibold text-right">
                    <button className="bg-white border border-gray-200 text-titleBlack px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors">
                      View
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
            {paginatedOrders.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="px-6 py-8 text-center text-gray-600 font-medium">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {filteredOrders.length > 0 && (
        <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 text-sm text-textGray">
          <div className="flex items-center gap-3">
            <span>Show :</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(val) => {
                setItemsPerPage(Number(val));
                setCurrentPage(1);
              }}>
              <SelectTrigger className="w-[70px] h-9 border-gray-200 focus:ring-0 focus:ring-offset-0 text-titleBlack">
                <SelectValue placeholder="5" />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                <SelectItem value="5">05</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
              </SelectContent>
            </Select>
            <span>Entries</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                  d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <div className="flex">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      "w-9 h-9 flex items-center justify-center font-medium transition-colors cursor-pointer",
                      currentPage === page
                        ? "bg-[#5161ff] text-white border border-[#5161ff] z-10"
                        : "text-titleBlack border-t border-b border-r border-gray-200 hover:bg-gray-50",
                      page === 1 && "rounded-l-md border-l",
                      page === totalPages && "rounded-r-md"
                    )}>
                    {page}
                  </button>
                ),
              )}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
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
                  d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
