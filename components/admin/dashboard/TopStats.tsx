import { Coins, PieChart as PieChartIcon, ShoppingCart, TrendingUp, TrendingDown } from "lucide-react";

export function TopStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col justify-between">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Earning</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">$ 36,476</h3>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 text-xs font-medium">
          <span className="text-green-500 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />
            +32.40%
          </span>
          <span className="text-gray-400">last month</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col justify-between">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
            <PieChartIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Average Order Value</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">$ 272.98</h3>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 text-xs font-medium">
          <span className="text-red-500 flex items-center gap-0.5">
            <TrendingDown className="w-3 h-3" />
            -12.40%
          </span>
          <span className="text-gray-400">last month</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col justify-between">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Orders</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">12,230</h3>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 text-xs font-medium">
          <span className="text-green-500 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />
            +32.40%
          </span>
          <span className="text-gray-400">last month</span>
        </div>
      </div>
    </div>
  );
}
