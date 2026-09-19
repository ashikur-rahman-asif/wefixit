import { AdminOrderDetail } from "@/types/admin";
import dayjs from "dayjs";
import { getOrderStatusColor } from "@/lib/utils";

export function OrderStatusHistory({ order }: { order: AdminOrderDetail }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-bold text-titleBlack">Status History</h2>
      </div>
      <div className="p-6">
        {order.statusHistory.length > 0 ? (
          <div className="space-y-6">
            {order.statusHistory.map((history, idx) => (
              <div key={history.id} className="flex gap-4 relative">
                {idx !== order.statusHistory.length - 1 && (
                  <div className="absolute left-2.5 top-7 bottom-[-24px] w-0.5 bg-gray-100"></div>
                )}
                <div className={`w-5 h-5 mt-1 rounded-full border-2 flex-shrink-0 z-10 ${getOrderStatusColor(history.toStatus)}`}></div>
                <div>
                  <p className="font-semibold text-titleBlack text-sm flex items-center gap-1">
                    Order status changed to <span className={`px-2 py-0.5 rounded-md text-[11px] capitalize ${getOrderStatusColor(history.toStatus)}`}>{history.toStatusLabel}</span>
                  </p>
                  <p className="text-xs font-semibold text-textGray mt-1">
                    By {history.changedBy} on {dayjs(history.at).format("MMM D, YYYY h:mm A")}
                  </p>
                  {history.note && (
                    <p className="text-sm font-medium text-gray-600 font-medium mt-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      {history.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-textGray font-semibold">No status history found.</p>
        )}
      </div>
    </div>
  );
}
