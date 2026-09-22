"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalesTrend } from "@/types/admin";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function RevenueAnalytics({ salesTrend }: { salesTrend: SalesTrend[] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 lg:col-span-2 p-6 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[18px] font-bold text-titleBlack">Revenue Analytics</h3>
        <button className="px-4 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-textGray hover:bg-gray-50 transition-colors">
          View Report
        </button>
      </div>

      <Tabs defaultValue="12_months" className="w-full">
        <TabsList className="flex flex-wrap h-auto bg-transparent p-0 gap-2 mb-8 justify-start">
          <TabsTrigger
            value="12_months"
            className="px-4 py-2 rounded-md data-[state=active]:bg-[#f0f1ff] data-[state=active]:text-[#5161ff] text-textGray text-[13px] font-medium data-[state=active]:font-semibold data-[state=active]:shadow-none bg-transparent transition-colors cursor-pointer"
          >
            12 Months
          </TabsTrigger>
          <TabsTrigger
            value="3_months"
            className="px-4 py-2 rounded-md data-[state=active]:bg-[#f0f1ff] data-[state=active]:text-[#5161ff] text-textGray text-[13px] font-medium data-[state=active]:font-semibold data-[state=active]:shadow-none bg-transparent transition-colors cursor-pointer"
          >
            3 Months
          </TabsTrigger>
          <TabsTrigger
            value="30_days"
            className="px-4 py-2 rounded-md data-[state=active]:bg-[#f0f1ff] data-[state=active]:text-[#5161ff] text-textGray text-[13px] font-medium data-[state=active]:font-semibold data-[state=active]:shadow-none bg-transparent transition-colors cursor-pointer"
          >
            30 Days
          </TabsTrigger>
          <TabsTrigger
            value="7_days"
            className="px-4 py-2 rounded-md data-[state=active]:bg-[#f0f1ff] data-[state=active]:text-[#5161ff] text-textGray text-[13px] font-medium data-[state=active]:font-semibold data-[state=active]:shadow-none bg-transparent transition-colors cursor-pointer"
          >
            7 Days
          </TabsTrigger>
          <TabsTrigger
            value="24_hours"
            className="px-4 py-2 rounded-md data-[state=active]:bg-[#f0f1ff] data-[state=active]:text-[#5161ff] text-textGray text-[13px] font-medium data-[state=active]:font-semibold data-[state=active]:shadow-none bg-transparent transition-colors cursor-pointer"
          >
            24 Hours
          </TabsTrigger>
        </TabsList>
        {["12_months", "3_months", "30_days", "7_days", "24_hours"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-0 outline-none">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesTrend}
                  margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                  barSize={16}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6a6a6a", fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6a6a6a", fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar
                    dataKey="revenue"
                    name="Revenue"
                    fill="var(--color-brand)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#5b6cf9]"></div>
                <span className="text-sm font-bold text-titleBlack">Repaired</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#f76a17]"></div>
                <span className="text-sm font-bold text-titleBlack">Pre-Owned</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#fba518]"></div>
                <span className="text-sm font-bold text-titleBlack">New Device</span>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
