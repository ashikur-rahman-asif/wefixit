"use client";

import { OrdersStatistic } from "@/components/admin/dashboard/OrdersStatistic";
import { RecentOrdersTable } from "@/components/admin/dashboard/RecentOrdersTable";
import { RevenueAnalytics } from "@/components/admin/dashboard/RevenueAnalytics";
import { TopStats } from "@/components/admin/dashboard/TopStats";

export default function AdminDashboard() {
  return (
    <div className="bg-[#F8F9FB] min-h-screen p-6 space-y-6">
      <TopStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueAnalytics />
        <OrdersStatistic />
      </div>

      <RecentOrdersTable />
    </div>
  );
}
