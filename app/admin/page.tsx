"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/api/admin/dashboard.api";
import { OrdersStatistic } from "@/components/admin/dashboard/OrdersStatistic";
import { RecentOrdersTable } from "@/components/admin/dashboard/RecentOrdersTable";
import { RevenueAnalytics } from "@/components/admin/dashboard/RevenueAnalytics";
import { TopStats } from "@/components/admin/dashboard/TopStats";
import { Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const { data: response, isLoading, isError } = useQuery({
    queryKey: ["adminDashboardStats"],
    queryFn: dashboardApi.getDashboardStats,
    staleTime: 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-100px)] w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-brand" />
      </div>
    );
  }

  if (isError || !response?.data) {
    return (
      <div className="flex h-[calc(100vh-100px)] w-full flex-col items-center justify-center text-red-500">
        <p className="text-xl font-bold">Failed to load dashboard stats</p>
        <p className="text-sm">Please check your connection and try again.</p>
      </div>
    );
  }

  const stats = response.data;

  return (
    <div className="bg-[#F8F9FB] min-h-screen p-6 space-y-6">
      <TopStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueAnalytics salesTrend={stats.salesTrend} />
        <OrdersStatistic orders={stats.orders} />
      </div>

      <RecentOrdersTable recentOrders={stats.recentOrders} />
    </div>
  );
}
