"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Package, ExternalLink, Clock } from "lucide-react";
import { PageLoader } from "@/components/ui/loader";
import Link from "next/link";
import { useCustomerOrders } from "@/features/orders/hooks/use-customer-orders";

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
    case "delivered":
      return "bg-green-100 text-green-700 border-green-200";
    case "processing":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "cancelled":
      return "bg-red-100 text-red-700 border-red-200";
    case "pending_payment":
    case "pending":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

export default function OrdersPage() {
  const { data: response, isLoading } = useCustomerOrders();
  const orders = response?.data || [];

  return (
    <div className="bg-white rounded-xl border border-border/50 p-5 md:p-8">
      <div className="mb-5 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-primary">My Orders</h1>
        <p className="text-gray-500 mt-1 text-xs md:text-sm">View and track your recent orders.</p>
      </div>

      {isLoading ? (
        <PageLoader message="Loading your orders..." className="py-8 min-h-[200px]" />
      ) : orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-border/60 rounded-xl p-5 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between hover:border-brand transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                  <Package className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-primary text-lg">#{order.reference}</h3>
                    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold border", getStatusColor(order.status))}>
                      {order.statusLabel}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {order.itemsCount} {order.itemsCount === 1 ? 'item' : 'items'}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {order.date}
                    </span>
                    <span className="font-bold text-gray-900">${order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-auto pt-4 md:pt-0 border-t border-gray-100 md:border-0">
                <Link
                  href={`/orders/${order.reference}`}
                  className={cn(buttonVariants({ variant: "outline" }), "w-full md:w-auto text-sm py-2 h-auto flex items-center gap-2")}
                >
                  View Details
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-primary mb-2">No orders found</h3>
          <p className="text-gray-500 text-sm mb-6">Looks like you haven&apos;t placed any orders yet.</p>
          <Link href="/shop" className={buttonVariants({ variant: "brand" })}>
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
