"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const orderStatsData = [
  { name: 'Repaired', value: 30, color: '#4f46e5' },
  { name: 'Pre-Owned', value: 45, color: '#f97316' },
  { name: 'New Device', value: 25, color: '#fdba74' },
];

export function OrdersStatistic() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Orders Statistic</h3>
        <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer">
          <option>Last Month</option>
          <option>This Month</option>
          <option>Last Year</option>
        </select>
      </div>
      
      <div className="h-48 w-full flex justify-center mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={orderStatsData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              {orderStatsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 flex-1">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 font-medium text-left">
              <th className="pb-3 font-medium">Source</th>
              <th className="pb-3 font-medium text-right">Orders</th>
              <th className="pb-3 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2.5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#4f46e5]"></div>
                <span className="text-gray-600">Repaired</span>
              </td>
              <td className="py-2.5 text-right text-gray-600">186</td>
              <td className="py-2.5 text-right text-gray-600 font-medium">$2,742.00</td>
            </tr>
            <tr>
              <td className="py-2.5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#f97316]"></div>
                <span className="text-gray-600">Pre-Owned</span>
              </td>
              <td className="py-2.5 text-right text-gray-600">186</td>
              <td className="py-2.5 text-right text-gray-600 font-medium">$2,742.00</td>
            </tr>
            <tr>
              <td className="py-2.5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#fdba74]"></div>
                <span className="text-gray-600">New Device</span>
              </td>
              <td className="py-2.5 text-right text-gray-600">186</td>
              <td className="py-2.5 text-right text-gray-600 font-medium">$2,742.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
