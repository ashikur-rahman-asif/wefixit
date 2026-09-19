import { AdminOrderDetail } from "@/types/admin";
import dayjs from "dayjs";
import { Clock, CreditCard } from "lucide-react";

export function PaymentDetailsCard({ order }: { order: AdminOrderDetail }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-lg font-bold text-titleBlack mb-5">Payment Details</h2>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#f8f9fb] flex items-center justify-center shrink-0 text-textGray">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-semibold text-textGray mb-0.5">Method</p>
            <p className="text-sm font-bold text-titleBlack">
              {order.paymentMethodLabel}
              {order.cardBrand && order.cardLast4 && (
                <span className="text-textGray font-medium ml-2">
                  ({order.cardBrand.toUpperCase()} •••• {order.cardLast4})
                </span>
              )}
            </p>
          </div>
        </div>
        {order.paidAt && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#f8f9fb] flex items-center justify-center shrink-0 text-textGray">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-textGray mb-0.5">Paid At</p>
              <p className="text-sm font-bold text-titleBlack">
                {dayjs(order.paidAt).format("MMM D, YYYY h:mm A")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
