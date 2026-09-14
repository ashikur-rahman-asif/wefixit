import { AdminOrderDetail } from "@/types/admin";
import { Mail, Phone, User } from "lucide-react";

export function CustomerDetailsCard({ order }: { order: AdminOrderDetail }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-lg font-bold text-titleBlack mb-5">Customer Details</h2>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#f8f9fb] flex items-center justify-center flex-shrink-0 text-textGray">
            <User className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-semibold text-textGray mb-0.5">Name</p>
            <p className="text-sm font-bold text-titleBlack">{order.customerName}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#f8f9fb] flex items-center justify-center flex-shrink-0 text-textGray">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-semibold text-textGray mb-0.5">Email</p>
            <p className="text-sm font-bold text-titleBlack break-all">{order.email || "N/A"}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#f8f9fb] flex items-center justify-center flex-shrink-0 text-textGray">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-semibold text-textGray mb-0.5">Phone</p>
            <p className="text-sm font-bold text-titleBlack">{order.phone || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
