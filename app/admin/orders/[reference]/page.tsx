"use client";

import dayjs from "dayjs";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { CustomerDetailsCard } from "./_components/CustomerDetailsCard";
import { OrderItemsTable } from "./_components/OrderItemsTable";
import { OrderStatusHistory } from "./_components/OrderStatusHistory";
import { getOrderStatusColor, getPaymentStatusColor } from "@/lib/utils";
import { OrderUpdateCard } from "./_components/OrderUpdateCard";
import { PaymentDetailsCard } from "./_components/PaymentDetailsCard";
import { ShippingAddressCard } from "./_components/ShippingAddressCard";
import { use, useState } from "react";
import {
  useAdminOrder,
  useDeleteOrder,
  useUpdateOrder,
} from "@/hooks/admin/use-order";
import { DeleteConfirmationModal } from "@/components/admin/DeleteConfirmationModal";

export default function AdminOrderDetailsPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = use(params);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: order, isLoading } = useAdminOrder(reference);
  const updateMutation = useUpdateOrder(reference);
  const deleteMutation = useDeleteOrder(reference);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <h2 className="text-xl font-bold text-gray-700">Order Not Found</h2>
        <Link
          href="/admin/orders"
          className="text-brand hover:underline flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Orders
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    deleteMutation.mutate(undefined, {
      onSettled: () => setIsDeleteModalOpen(false),
    });
  };

  const handleOpenModal = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="bg-[#F8F9FB] min-h-screen p-6">
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Order"
        description="Are you sure you want to delete this order? This action cannot be undone."
        isDeleting={deleteMutation.isPending}
      />
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/orders"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-100 text-gray-500 hover:text-titleBlack hover:shadow-sm transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-[24px] font-bold text-titleBlack leading-none flex items-center gap-3">
            Order #{order.reference}
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize tracking-wide ${getOrderStatusColor(order.status)}`}
            >
              {order.statusLabel}
            </span>
          </h1>
          <p className="text-textGray mt-2 text-sm flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Placed on {dayjs(order.placedAt).format("MMMM D, YYYY [at] h:mm A")}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Items & History */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <OrderItemsTable order={order} />
          <OrderStatusHistory order={order} />
        </div>

        {/* Right — Actions & Details */}
        <div className="w-full lg:w-[380px] space-y-6 shrink-0">
          <OrderUpdateCard
            order={order}
            onUpdate={(data) => updateMutation.mutate(data)}
            onDelete={handleOpenModal}
            isUpdating={updateMutation.isPending}
            isDeleting={deleteMutation.isPending}
          />
          <CustomerDetailsCard order={order} />
          <ShippingAddressCard order={order} />
          <PaymentDetailsCard order={order} />
        </div>
      </div>
    </div>
  );
}
