"use client";

import { useAdminRepair, useUpdateRepair, useDeleteRepair } from "@/features/repairs/hooks/use-admin-repair";
import { use } from "react";
import Link from "next/link";
import { getOrderStatusColor } from "@/lib/utils";
import { RepairUpdateCard } from "./_components/RepairUpdateCard";
import { RepairCustomerCard } from "./_components/RepairCustomerCard";
import { RepairDeviceCard } from "./_components/RepairDeviceCard";
import { RepairTimeline } from "./_components/RepairTimeline";

export default function AdminRepairDetailsPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = use(params);
  
  const { data: repair, isLoading } = useAdminRepair(reference);
  const updateMutation = useUpdateRepair(reference);
  const deleteMutation = useDeleteRepair(reference);

  if (isLoading) {
    return (
      <div className="p-6 md:p-10 max-w-[1600px] mx-auto min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-textGray">
          <div className="w-8 h-8 border-4 border-brand/30 border-t-brand rounded-full animate-spin mb-4" />
          <p className="font-medium">Loading repair details...</p>
        </div>
      </div>
    );
  }

  if (!repair) {
    return (
      <div className="p-6 md:p-10 max-w-[1600px] mx-auto min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-textGray">
          <p className="font-medium text-xl text-titleBlack mb-2">Repair Not Found</p>
          <Link href="/admin/repair-orders" className="text-brand hover:underline font-semibold">
            Return to Repairs List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-[1600px] mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link
              href="/admin/repair-orders"
              className="text-textGray hover:text-titleBlack transition-colors text-sm font-semibold flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Repairs
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-[28px] md:text-[32px] font-bold text-titleBlack leading-tight tracking-tight">
              Repair #{repair.reference}
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-[13px] font-bold capitalize ${getOrderStatusColor(
                repair.status
              )}`}
            >
              {repair.statusLabel}
            </span>
          </div>
          <p className="text-textGray mt-1 text-[15px] font-medium">
            Created on {repair.date}
          </p>
        </div>
        
        <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 ">
          <p className="text-textGray text-xs font-semibold uppercase tracking-wider mb-0.5">
            Estimated Total
          </p>
          <p className="text-2xl font-bold text-brand">
            ${repair.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <RepairUpdateCard
            repair={repair}
            onUpdate={(data) => updateMutation.mutate(data)}
            onDelete={() => {
              if (confirm("Are you sure you want to delete this repair?")) {
                deleteMutation.mutate();
              }
            }}
            isUpdating={updateMutation.isPending}
            isDeleting={deleteMutation.isPending}
          />
          
          <RepairDeviceCard repair={repair} />
        </div>

        <div className="space-y-6">
          <RepairCustomerCard repair={repair} />
          
          <RepairTimeline repair={repair} />
        </div>
      </div>
    </div>
  );
}
