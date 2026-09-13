"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, Package, MapPin, CreditCard, Receipt } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const dummyOrderDetails = {
  id: "ORD-9823",
  date: "10 Sep 2026",
  status: "Processing",
  total: "৳ 2,150",
  paymentMethod: "Cash on Delivery",
  shippingAddress: {
    name: "John Doe",
    phone: "+8801516540594",
    address: "House 12, Road 5, Block C, Banani",
    city: "Dhaka",
    zip: "1213",
  },
  items: [
    {
      id: 1,
      name: "iPhone 13 Pro Max Clear Case",
      price: "৳ 850",
      quantity: 1,
      image: "https://via.placeholder.com/60",
    },
    {
      id: 2,
      name: "20W USB-C Power Adapter",
      price: "৳ 1,200",
      quantity: 1,
      image: "https://via.placeholder.com/60",
    },
  ],
  summary: {
    subtotal: "৳ 2,050",
    shipping: "৳ 100",
    total: "৳ 2,150",
  }
};

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.id as string;
  
  const order = dummyOrderDetails;

  return (
    <div className="bg-white rounded-xl border border-border/50 p-5 md:p-8">
      {}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-border/50">
        <div>
          <Link href="/orders" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand mb-3 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl md:text-2xl font-bold text-primary">Order #{orderId || order.id}</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-blue-50 text-blue-700 border-blue-200">
              {order.status}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Placed on {order.date}</p>
        </div>
        <button className={cn(buttonVariants({ variant: "outline" }), "flex items-center gap-2")}>
          <Receipt className="w-4 h-4" />
          Download Invoice
        </button>
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
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 items-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-lg border border-border/50 shrink-0"></div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-primary text-sm md:text-base">{item.name}</h4>
                    <p className="text-gray-500 text-xs md:text-sm mt-0.5">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-bold text-primary">{item.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {}
        <div className="space-y-6">
          {}
          <div className="bg-gray-50 rounded-xl p-5 border border-border/50">
            <h3 className="font-bold text-primary mb-4 text-sm uppercase tracking-wider">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{order.summary.subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping Fee</span>
                <span>{order.summary.shipping}</span>
              </div>
              <div className="border-t border-border/60 pt-3 flex justify-between font-bold text-primary text-base">
                <span>Total</span>
                <span className="text-brand">{order.summary.total}</span>
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
              <p>{order.shippingAddress.city} - {order.shippingAddress.zip}</p>
            </div>
          </div>

          {}
          <div className="border border-border/60 rounded-xl p-5">
            <h3 className="font-bold text-primary mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
              <CreditCard className="w-4 h-4 text-gray-400" />
              Payment Method
            </h3>
            <div className="text-sm text-gray-600">
              <p className="font-semibold text-primary">{order.paymentMethod}</p>
              <p className="text-xs mt-0.5">Payment pending upon delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
