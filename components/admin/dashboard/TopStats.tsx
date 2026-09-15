import { DashboardStats } from "@/types/admin";
import { Coins, PieChart as PieChartIcon, ShoppingCart } from "lucide-react";

export function TopStats({ stats }: { stats: DashboardStats }) {
  const avgOrderValue = stats.orders.total > 0 ? (stats.revenue.total / stats.orders.total).toFixed(2) : "0.00";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col justify-between">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Coins className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm text-[#9A9A9A] font-medium">Total Earning</p>
            <h3 className="text-3xl font-bold text-titleBlack mt-1">$ {stats.revenue.total.toLocaleString()}</h3>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-4 text-xs font-bold">
          <span className="text-[#088B3A]">↗ +32.40%</span>
          <span className="text-gray-600 font-medium">last month</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col justify-between">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
            <PieChartIcon className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm text-[#9A9A9A] font-medium">Average Order Value</p>
            <h3 className="text-3xl font-bold text-titleBlack mt-1">$ {avgOrderValue}</h3>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-4 text-xs font-bold">
          <span className="text-red-600">↗ +32.40%</span>
          <span className="text-gray-600 font-medium">last month</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col justify-between">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <ShoppingCart className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm text-[#9A9A9A] font-medium">Total Orders</p>
            <h3 className="text-3xl font-bold text-titleBlack mt-1">{stats.orders.total.toLocaleString()}</h3>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-4 text-xs font-bold">
          <span className="text-[#088B3A]">↗ +32.40%</span>
          <span className="text-gray-600 font-medium">last month</span>
        </div>
      </div>
    </div>
  );
}
