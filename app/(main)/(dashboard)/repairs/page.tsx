"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Wrench, ExternalLink, Clock, Smartphone } from "lucide-react";
import Link from "next/link";

const dummyRepairs = [
  {
    id: "REP-4592",
    date: "12 Sep 2026",
    total: "৳ 4,500",
    status: "Repairing",
    device: "iPhone 13 Pro",
    issue: "Broken Screen & Battery Drain",
  },
  {
    id: "REP-4510",
    date: "05 Sep 2026",
    total: "৳ 1,200",
    status: "Ready for Delivery",
    device: "Samsung Galaxy S21",
    issue: "Charging Port Replacement",
  },
  {
    id: "REP-4401",
    date: "28 Aug 2026",
    total: "৳ 850",
    status: "Diagnosing",
    device: "MacBook Pro M1",
    issue: "Not turning on",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Ready for Delivery":
      return "bg-green-100 text-green-700 border-green-200";
    case "Repairing":
      return "bg-brand/10 text-brand border-brand/20";
    case "Diagnosing":
      return "bg-orange-100 text-orange-700 border-orange-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

export default function RepairsPage() {
  return (
    <div className="bg-white rounded-xl border border-border/50 p-5 md:p-8">
      <div className="mb-5 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-primary">My Repairs</h1>
        <p className="text-gray-500 mt-1 text-xs md:text-sm">Track the status of your device repairs in real-time.</p>
      </div>

      {dummyRepairs.length > 0 ? (
        <div className="space-y-4">
          {dummyRepairs.map((repair) => (
            <div key={repair.id} className="border border-border/60 rounded-xl p-5 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between hover:border-brand transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Smartphone className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3 className="font-bold text-primary text-lg">#{repair.id}</h3>
                    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold border", getStatusColor(repair.status))}>
                      {repair.status}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 mb-0.5">{repair.device}</p>
                  <p className="text-sm text-gray-500 mb-2">{repair.issue}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {repair.date}
                    </span>
                    <span className="font-bold text-gray-900">{repair.total}</span>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-auto pt-4 md:pt-0 border-t border-gray-100 md:border-0">
                <Link
                  href={`/repairs/${repair.id}`}
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
