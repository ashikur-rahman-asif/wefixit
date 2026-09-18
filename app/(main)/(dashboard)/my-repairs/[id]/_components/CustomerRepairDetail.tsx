"use client";

import { useCustomerRepair } from "@/features/repairs/hooks/use-customer-repairs";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileText,
  Loader2,
  Smartphone,
} from "lucide-react";
import Link from "next/link";

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

export function CustomerRepairDetail({ repairId }: { repairId: string }) {
  const { data: repair, isLoading } = useCustomerRepair(repairId);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-border/50 p-5 md:p-8 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-brand mb-4" />
        <p className="text-gray-500">Loading repair details...</p>
      </div>
    );
  }

  if (!repair) {
    return (
      <div className="bg-white rounded-xl border border-border/50 p-5 md:p-8 flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-red-500 font-bold text-lg mb-2">Repair not found</p>
        <p className="text-gray-500 mb-4">
          We couldn&apos;t find the details for this repair.
        </p>
        <Link
          href="/my-repairs"
          className="text-brand hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to My Repairs
        </Link>
      </div>
    );
  }

  const formatCurrency = (amount: number | null | undefined) => {
    if (amount == null) return "Pending";
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-xl border border-border/50 p-5 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border/50">
        <div>
          <Link
            href="/my-repairs"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand mb-3 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Repairs
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl md:text-2xl font-bold text-primary">
              Repair #{repair.reference}
            </h1>
            <span
              className={cn(
                "px-2.5 py-0.5 rounded-full text-xs font-semibold border",
                getStatusColor(repair.status),
              )}>
              {repair.statusLabel}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Started on {repair.date}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="font-bold text-primary mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" />
            Repair Status Tracker
          </h3>
          <div className="pl-2">
            {repair.timeline && repair.timeline.length > 0 ? (
              repair.timeline.map((step, index) => (
                <div key={index} className="relative pb-8 last:pb-0">
                  {index !== repair.timeline.length - 1 && (
                    <div
                      className={cn(
                        "absolute left-3 top-6 -bottom-2 w-0.5 bg-brand",
                      )}
                    />
                  )}

                  <div className="relative flex items-start gap-4">
                    <div className="bg-white relative z-10 shrink-0 mt-0.5">
                      {index === 0 ? (
                        <div className="w-6 h-6 rounded-full border-2 border-brand bg-white flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                        </div>
                      ) : (
                        <CheckCircle2 className="w-6 h-6 text-brand" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm md:text-base text-primary">
                        {step.title}
                      </h4>
                      <p className="text-xs md:text-sm text-gray-500 mt-1">
                        {new Date(step.occurredAt).toLocaleString()}
                      </p>
                      {step.description && (
                        <p className="text-xs text-gray-600 mt-1">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No timeline events yet.</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
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
                <h4 className="font-bold text-primary">
                  {repair.device} {repair.modelName && `- ${repair.modelName}`}
                </h4>
                <p className="text-sm text-gray-500">{repair.issue}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-xs text-gray-500 uppercase font-semibold">
                  User Reported Issue
                </span>
                <p className="text-sm text-gray-700 mt-1">
                  {repair.issueDescription || "No additional details provided."}
                </p>
              </div>
              {repair.notes && (
                <div className="pt-3 border-t border-border/60">
                  <span className="text-xs text-gray-500 uppercase font-semibold">
                    Technician Notes
                  </span>
                  <p className="text-sm text-gray-700 mt-1">{repair.notes}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 border border-border/50">
            <h3 className="font-bold text-primary mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
              <FileText className="w-4 h-4 text-gray-400" />
              Estimated Cost
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Parts</span>
                <span>{formatCurrency(repair.partsCost)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Service Charge</span>
                <span>{formatCurrency(repair.serviceCharge)}</span>
              </div>
              <div className="border-t border-border/60 pt-3 flex justify-between font-bold text-primary text-base">
                <span>Total Estimate</span>
                <span className="text-brand">
                  {repair.total > 0
                    ? `$${repair.total.toLocaleString()}`
                    : "Pending"}
                </span>
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
