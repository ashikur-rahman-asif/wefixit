import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const recentOrders = [
  { id: '#00745', type: 'Repaired', customer: 'Guinever Cassi', email: 'exmpole@gmail.com', date: '2022-12-23', items: 'Galaxy S22 ultra', price: '$140.20', paid: true, status: 'In progress' },
  { id: '#00745', type: 'Pre-Owned', customer: 'Guinever Cassi', email: 'exmpole@gmail.com', date: '2022-12-23', items: 'Galaxy S22 ultra', price: '$140.20', paid: false, status: 'Finished' },
  { id: '#00745', type: 'New Device', customer: 'Guinever Cassi', email: 'exmpole@gmail.com', date: '2022-12-23', items: 'Galaxy S22 ultra', price: '$140.20', paid: false, status: 'In progress' },
  { id: '#00745', type: 'Repaired', customer: 'Guinever Cassi', email: 'exmpole@gmail.com', date: '2022-12-23', items: 'Galaxy S22 ultra', price: '$140.20', paid: false, status: 'Finished' },
  { id: '#00745', type: 'Repaired', customer: 'Guinever Cassi', email: 'exmpole@gmail.com', date: '2022-12-23', items: 'Galaxy S22 ultra', price: '$140.20', paid: true, status: 'In progress' },
  { id: '#00745', type: 'Pre-Owned', customer: 'Guinever Cassi', email: 'exmpole@gmail.com', date: '2022-12-23', items: 'Galaxy S22 ultra', price: '$140.20', paid: true, status: 'In progress' },
];

export function RecentOrdersTable() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-gray-900 rounded-full"></div>
          <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-64"
            />
          </div>
          <button className="bg-brand text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            View All Orders
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#F8F9FB] text-gray-500 font-medium">
            <tr>
              <th className="px-6 py-4 font-medium rounded-tl-lg">Order Id</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Items</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Paid</th>
              <th className="px-6 py-4 font-medium rounded-tr-lg">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {recentOrders.map((order, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-gray-900 font-medium">{order.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ring-2 ring-offset-1 ${
                      order.type === 'Repaired' ? 'bg-[#4f46e5] ring-[#4f46e5]/30' : 
                      order.type === 'Pre-Owned' ? 'bg-[#f97316] ring-[#f97316]/30' : 
                      'bg-[#fdba74] ring-[#fdba74]/30'
                    }`}></div>
                    <span className={`text-xs font-medium ${
                      order.type === 'Repaired' ? 'text-[#4f46e5]' : 
                      order.type === 'Pre-Owned' ? 'text-[#f97316]' : 
                      'text-[#fdba74]'
                    }`}>{order.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-gray-900 font-medium text-xs">{order.customer}</span>
                    <span className="text-gray-400 text-[10px]">{order.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-900 text-xs font-medium">{order.date}</td>
                <td className="px-6 py-4 text-gray-900 text-xs font-medium">{order.items}</td>
                <td className="px-6 py-4 text-gray-900 text-xs font-medium">{order.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.paid ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'
                  }`}>
                    {order.paid ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Finished' ? 'bg-green-50 text-green-600' : 'bg-cyan-50 text-cyan-600'
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Show :</span>
          <select className="border border-gray-200 rounded px-2 py-1 outline-none focus:border-brand bg-white">
            <option>05</option>
            <option>10</option>
            <option>20</option>
          </select>
          <span>Entries</span>
        </div>
        
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-brand text-white font-medium text-sm transition-colors">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 font-medium text-sm transition-colors">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 font-medium text-sm transition-colors">
            3
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
