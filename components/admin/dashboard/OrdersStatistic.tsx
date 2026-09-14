"use client";

import { OrderStats } from "@/types/admin";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const COLORS = ['#4f46e5', '#f97316', '#fdba74', '#10b981', '#ef4444', '#8b5cf6'];

export function OrdersStatistic({ orders }: { orders: OrderStats }) {

  const orderStatsData = Object.entries(orders.byStatus || {}).map(([key, value], index) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: value,
    color: COLORS[index % COLORS.length]
  }));

  if (orderStatsData.length === 0) {
    orderStatsData.push({ name: 'No Orders', value: 1, color: '#e5e7eb' });
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[18px] font-bold text-titleBlack">Orders Statistic</h3>
        <Select>
          <SelectTrigger className="w-[120px] h-8 text-[13px] font-medium text-textGray border-gray-200 focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            <SelectItem value="Last Month">Last Month</SelectItem>
            <SelectItem value="This Month">This Month</SelectItem>
            <SelectItem value="This Year">This Year</SelectItem>
          </SelectContent>
        </Select>
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
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {orderStatsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 flex-1">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-textGray text-[13px] font-medium text-left">
              <th className="pb-3 font-medium">Source</th>
              <th className="pb-3 font-medium text-right">Orders</th>
            </tr>
          </thead>
          <tbody>
            {orderStatsData.map((stat, idx) => (
              <tr key={idx}>
                <td className="py-2.5 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stat.color }}></div>
                  <span className="text-textGray text-[13px] font-medium">{stat.name}</span>
                </td>
                <td className="py-2.5 text-right text-textGray text-[13px] font-medium">{stat.name === 'No Orders' ? 0 : stat.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
