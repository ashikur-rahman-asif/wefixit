"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, Smartphone, FileText, CheckCircle2, Clock, Circle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const dummyRepairDetails = {
  id: "REP-4592",
  date: "12 Sep 2026",
  status: "Repairing",
  total: "৳ 4,500",
  device: "iPhone 13 Pro",
  issue: "Broken Screen & Battery Drain",
  notes: "Device has multiple scratches on the back glass. Screen is completely shattered. Battery health at 72%.",
  timeline: [
    {
      title: "Repair Request Submitted",
      date: "12 Sep 2026, 10:00 AM",
      completed: true,
    },
    {
      title: "Device Received",
      date: "12 Sep 2026, 11:30 AM",
      completed: true,
    },
    {
      title: "Diagnosing",
      date: "12 Sep 2026, 01:00 PM",
      completed: true,
    },
    {
      title: "Repairing",
      date: "Currently in progress",
      completed: false,
      current: true,
    },
    {
      title: "Quality Testing",
      date: "Pending",
      completed: false,
    },
    {
      title: "Ready for Delivery",
      date: "Pending",
      completed: false,
    }
  ]
};

export default function RepairDetailsPage() {
  const params = useParams();
  const repairId = params.id as string;
  
  const repair = dummyRepairDetails;

  return (
    <div className="bg-white rounded-xl border border-border/50 p-5 md:p-8">
      {}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border/50">
        <div>
          <Link href="/repairs" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand mb-3 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Repairs
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl md:text-2xl font-bold text-primary">Repair #{repairId || repair.id}</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-brand/10 text-brand border-brand/20">
              {repair.status}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Started on {repair.date}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {}
        <div>
          <h3 className="font-bold text-primary mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" />
            Repair Status Tracker
          </h3>
          <div className="pl-2">
            {repair.timeline.map((step, index) => (
              <div key={index} className="relative pb-8 last:pb-0">
                {}
                {index !== repair.timeline.length - 1 && (
                  <div 
                    className={cn(
                      "absolute left-3 top-6 -bottom-2 w-0.5",
                      step.completed ? "bg-brand" : "bg-gray-200"
                    )} 
                  />
                )}
                
                <div className="relative flex items-start gap-4">
                  <div className="bg-white relative z-10 shrink-0 mt-0.5">
                    {step.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-brand" />
                    ) : step.current ? (
                      <div className="w-6 h-6 rounded-full border-2 border-brand bg-white flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                      </div>
                    ) : (
                      <Circle className="w-6 h-6 text-gray-200" />
                    )}
                  </div>
                  <div>
                    <h4 className={cn(
                      "font-semibold text-sm md:text-base",
                      step.completed || step.current ? "text-primary" : "text-gray-400"
                    )}>
                      {step.title}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">{step.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {}
        <div className="space-y-6">
          {}
          <div className="border border-border/60 rounded-xl p-5">
            <h3 className="font-bold text-primary mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
              <Smartphone className="w-4 h-4 text-gray-400" />
              Device Details
            </h3>
            
            <div className="flex gap-4 items-center pb-4 mb-4 border-b border-border/60">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Smartphone className="w-6 h-6 text-brand" />
              </div>
              <div>
                <h4 className="font-bold text-primary">{repair.device}</h4>
                <p className="text-sm text-gray-500">{repair.issue}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-xs text-gray-500 uppercase font-semibold">Diagnosis Notes</span>
                <p className="text-sm text-gray-700 mt-1">{repair.notes}</p>
              </div>
            </div>
          </div>

          {}
          <div className="bg-gray-50 rounded-xl p-5 border border-border/50">
            <h3 className="font-bold text-primary mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
              <FileText className="w-4 h-4 text-gray-400" />
              Estimated Cost
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Parts</span>
                <span>৳ 3,000</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Service Charge</span>
                <span>৳ 1,500</span>
              </div>
              <div className="border-t border-border/60 pt-3 flex justify-between font-bold text-primary text-base">
                <span>Total Estimate</span>
                <span className="text-brand">{repair.total}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Final cost may vary slightly based on internal diagnostics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
