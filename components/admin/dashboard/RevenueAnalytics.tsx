"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const revenueData = [
  { name: 'Jan', repaired: 4000, preOwned: 2400, newDevice: 2400 },
  { name: 'Feb', repaired: 3000, preOwned: 1398, newDevice: 2210 },
  { name: 'Mar', repaired: 2000, preOwned: 9800, newDevice: 2290 },
  { name: 'Apr', repaired: 2780, preOwned: 3908, newDevice: 2000 },
  { name: 'May', repaired: 1890, preOwned: 4800, newDevice: 2181 },
  { name: 'Jun', repaired: 2390, preOwned: 3800, newDevice: 2500 },
  { name: 'Jul', repaired: 3490, preOwned: 4300, newDevice: 2100 },
  { name: 'Aug', repaired: 4000, preOwned: 2400, newDevice: 2400 },
  { name: 'Sep', repaired: 3000, preOwned: 1398, newDevice: 2210 },
  { name: 'Oct', repaired: 2000, preOwned: 9800, newDevice: 2290 },
  { name: 'Nov', repaired: 2780, preOwned: 3908, newDevice: 2000 },
  { name: 'Dec', repaired: 1890, preOwned: 4800, newDevice: 2181 },
];

export function RevenueAnalytics() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 lg:col-span-2 p-6 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Revenue Analytics</h3>
        <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
          View Report
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-8">
        <button className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">12 Months</button>
        <button className="px-4 py-1.5 rounded-full text-gray-500 hover:bg-gray-50 text-sm font-medium transition-colors">3 Months</button>
        <button className="px-4 py-1.5 rounded-full text-gray-500 hover:bg-gray-50 text-sm font-medium transition-colors">30 Days</button>
        <button className="px-4 py-1.5 rounded-full text-gray-500 hover:bg-gray-50 text-sm font-medium transition-colors">7 Days</button>
        <button className="px-4 py-1.5 rounded-full text-gray-500 hover:bg-gray-50 text-sm font-medium transition-colors">24 Hours</button>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={revenueData}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            barSize={16}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
            <Tooltip cursor={{fill: 'transparent'}} />
            <Bar dataKey="repaired" stackId="a" fill="#4f46e5" radius={[0, 0, 4, 4]} />
            <Bar dataKey="preOwned" stackId="a" fill="#818cf8" />
            <Bar dataKey="newDevice" stackId="a" fill="#c7d2fe" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#4f46e5]"></div>
          <span className="text-sm font-medium text-gray-700">Repaired</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#818cf8]"></div>
          <span className="text-sm font-medium text-gray-700">Pre-Owned</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#c7d2fe]"></div>
          <span className="text-sm font-medium text-gray-700">New Device</span>
        </div>
      </div>
    </div>
  );
}
