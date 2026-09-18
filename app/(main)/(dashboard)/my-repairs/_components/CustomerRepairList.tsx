"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Wrench, ExternalLink, Clock, Smartphone, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCustomerRepairs } from "@/features/repairs/hooks/use-customer-repairs";

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
    case "delivered":
      return "bg-green-100 text-green-700 border-green-200";
    case "ready_for_delivery":
      return "bg-teal-100 text-teal-700 border-teal-200";
    case "repairing":
    case "diagnosing":
      return "bg-brand/10 text-brand border-brand/20";
    case "picked_up":
    case "received":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "cancelled":
      return "bg-red-100 text-red-700 border-red-200";
    case "pending":
      return "bg-blue-100 text-blue-700 border-blue-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

export function CustomerRepairList() {
  const { data: response, isLoading } = useCustomerRepairs();
  const repairs = response?.data || [];

  return (
    <div className="bg-white rounded-xl border border-border/50 p-5 md:p-8">
      <div className="mb-5 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-primary">My Repairs</h1>
        <p className="text-gray-500 mt-1 text-xs md:text-sm">Track the status of your device repairs in real-time.</p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-brand mb-4" />
          <p className="text-gray-500 text-sm">Loading your repairs...</p>
        </div>
      ) : repairs.length > 0 ? (
        <div className="space-y-4">
          {repairs.map((repair) => (
            <div key={repair.id} className="border border-border/60 rounded-xl p-5 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between hover:border-brand transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Smartphone className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3 className="font-bold text-primary text-lg">#{repair.reference}</h3>
                    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold border", getStatusColor(repair.status))}>
                      {repair.statusLabel}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 mb-0.5">{repair.device}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    {repair.issue 
                      ? repair.issue.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') 
                      : repair.modelName}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {repair.date}
                    </span>
                    {repair.total > 0 && (
                      <span className="font-bold text-gray-900">${repair.total.toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-auto pt-4 md:pt-0 border-t border-gray-100 md:border-0">
                <Link
                  href={`/my-repairs/${repair.reference}`}
                  className={cn(buttonVariants({ variant: "outline" }), "w-full md:w-auto text-sm py-2 h-auto flex items-center gap-2")}
                >
                  Track Repair
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Wrench className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-primary mb-2">No active repairs</h3>
          <p className="text-gray-500 text-sm mb-6">You don&apos;t have any devices currently in repair.</p>
          <Link href="/repair" className={buttonVariants({ variant: "brand" })}>
            Book a Repair
          </Link>
        </div>
      )}
    </div>
  );
}
