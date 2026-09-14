"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminOrderDetail } from "@/types/admin";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface OrderUpdateCardProps {
  order: AdminOrderDetail;
  onUpdate: (data: { status?: string; paymentStatus?: string; note?: string }) => void;
  onDelete: () => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

export function OrderUpdateCard({
  order,
  onUpdate,
  onDelete,
  isUpdating,
  isDeleting,
}: OrderUpdateCardProps) {
  const [localStatus, setLocalStatus] = useState<string>();
  const [localPaymentStatus, setLocalPaymentStatus] = useState<string>();
  const [note, setNote] = useState<string>("");

  const currentStatus = localStatus ?? order.status ?? "";
  const currentPaymentStatus = localPaymentStatus ?? order.paymentStatus ?? "";

  const handleUpdate = () => {
    const updateData: { status?: string; paymentStatus?: string; note?: string } = {};
    if (localStatus && localStatus !== order.status) updateData.status = localStatus;
    if (localPaymentStatus && localPaymentStatus !== order.paymentStatus)
      updateData.paymentStatus = localPaymentStatus;
    if (note.trim()) updateData.note = note.trim();

    if (Object.keys(updateData).length > 0) {
      onUpdate(updateData);
      setNote("");
    } else {
      toast.info("No changes to update");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold text-titleBlack">Update Order</h2>
        <button
          onClick={onDelete}
          disabled={isDeleting}
          className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-50"
          title="Delete Order"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Order Status */}
        <div>
          <label className="block text-sm font-semibold text-titleBlack mb-2">
            Order Status
          </label>
          <Select
            value={currentStatus}
            onValueChange={(v) => setLocalStatus(v ?? undefined)}
          >
            <SelectTrigger className="w-full h-11 border-gray-200 text-titleBlack font-semibold">
              <SelectValue placeholder="Status">
                {currentStatus === "pending_payment"
                  ? "Pending Payment"
                  : currentStatus === "processing"
                    ? "Processing"
                    : currentStatus === "completed"
                      ? "Completed"
                      : currentStatus === "delivered"
                        ? "Delivered"
                        : currentStatus === "cancelled"
                          ? "Cancelled"
                          : "Select status"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectItem value="pending_payment">Pending Payment</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Payment Status */}
        <div>
          <label className="block text-sm font-semibold text-titleBlack mb-2">
            Payment Status
          </label>
          <Select
            value={currentPaymentStatus}
            onValueChange={(v) => setLocalPaymentStatus(v ?? undefined)}
          >
            <SelectTrigger className="w-full h-11 border-gray-200 text-titleBlack font-semibold">
              <SelectValue placeholder="Payment Status">
                {currentPaymentStatus === "pending"
                  ? "Pending"
                  : currentPaymentStatus === "paid"
                    ? "Paid"
                    : currentPaymentStatus === "failed"
                      ? "Failed"
                      : currentPaymentStatus === "refunded"
                        ? "Refunded"
                        : "Select status"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-semibold text-titleBlack mb-2">
            Update Note{" "}
            <span className="text-textGray font-normal">(Optional)</span>
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Reason for update..."
            className="w-full min-h-20 p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand resize-none"
          />
        </div>

        <button
          onClick={handleUpdate}
          disabled={isUpdating}
          className="w-full bg-brand text-white h-11 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer"
        >
          {isUpdating ? "Updating..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
