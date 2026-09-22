"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, Package, MapPin, CreditCard } from "lucide-react";
import { PageLoader } from "@/components/ui/loader";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCustomerOrder } from "@/features/orders/hooks/use-customer-orders";
import Image from "next/image";

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.id as string;

  const { data: order, isLoading } = useCustomerOrder(orderId);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-border/50 p-5 md:p-8">
        <PageLoader message="Loading order details..." />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-white rounded-xl border border-border/50 p-5 md:p-8 min-h-[400px] flex flex-col items-center justify-center">
        <Package className="w-12 h-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-bold text-primary mb-2">Order not found</h3>
        <p className="text-gray-500 mb-6">
          We couldn&apos;t find the order you&apos;re looking for.
        </p>
        <Link href="/orders" className={buttonVariants({ variant: "outline" })}>
          Back to Orders
        </Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "delivered":
        return "bg-green-50 text-green-700 border-green-200";
      case "processing":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      case "pending_payment":
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-border/50 p-5 md:p-8">
      {}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-border/50">
        <div>
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand mb-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl md:text-2xl font-bold text-primary">Order #{order.reference}</h1>
            <span
              className={cn(
                "px-2.5 py-0.5 rounded-full text-xs font-semibold border",
                getStatusColor(order.status),
              )}
            >
              {order.statusLabel}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Placed on {order.date}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-gray-400" />
              Order Items
            </h3>
            <div className="border border-border/60 rounded-xl divide-y divide-border/60">
              {order.items?.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 items-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-lg border border-border/50 shrink-0 relative overflow-hidden flex items-center justify-center text-gray-400">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    ) : (
                      <Package className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-primary text-sm md:text-base">{item.name}</h4>
                    <p className="text-gray-500 text-xs md:text-sm mt-0.5">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-bold text-primary">${item.price.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {}
        <div className="space-y-6">
          {}
          <div className="bg-gray-50 rounded-xl p-5 border border-border/50">
            <h3 className="font-bold text-primary mb-4 text-sm uppercase tracking-wider">
              Order Summary
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${order.summary.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping Fee</span>
                <span>${order.summary.shipping.toLocaleString()}</span>
              </div>
              <div className="border-t border-border/60 pt-3 flex justify-between font-bold text-primary text-base">
                <span>Total</span>
                <span className="text-brand">${order.summary.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {}
          <div className="border border-border/60 rounded-xl p-5">
            <h3 className="font-bold text-primary mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-gray-400" />
              Shipping Address
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-semibold text-primary">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.phone}</p>
              <p className="pt-1">{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.city} - {order.shippingAddress.zip}
              </p>
            </div>
          </div>

          {}
          <div className="border border-border/60 rounded-xl p-5">
            <h3 className="font-bold text-primary mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
              <CreditCard className="w-4 h-4 text-gray-400" />
              Payment Details
            </h3>
            <div className="text-sm text-gray-600">
              <p className="font-semibold text-primary">{order.paymentMethodLabel}</p>
              <p className="text-xs mt-0.5">Status: {order.paymentStatusLabel}</p>
              {order.cardBrand && (
                <p className="text-xs mt-1 text-gray-500">
                  {order.cardBrand} ending in {order.cardLast4}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
