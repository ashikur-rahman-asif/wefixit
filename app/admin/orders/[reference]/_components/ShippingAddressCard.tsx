import { AdminOrderDetail } from "@/types/admin";
import { MapPin } from "lucide-react";

export function ShippingAddressCard({ order }: { order: AdminOrderDetail }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-lg font-bold text-titleBlack mb-5">Shipping Address</h2>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-[#f8f9fb] flex items-center justify-center flex-shrink-0 text-textGray mt-1">
          <MapPin className="w-4 h-4" />
        </div>
        <div className="text-sm font-semibold text-titleBlack leading-relaxed">
          <p>{order.shippingAddress.name}</p>
          {order.shippingAddress.phone && <p>{order.shippingAddress.phone}</p>}
          <p>{order.shippingAddress.address}</p>
          <p>
            {order.shippingAddress.city} {order.shippingAddress.zip}
          </p>
        </div>
      </div>
    </div>
  );
}
