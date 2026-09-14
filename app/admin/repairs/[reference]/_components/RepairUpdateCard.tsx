"use client";

import { useForm } from "react-hook-form";
import { AdminRepairDetail } from "@/types/admin";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Loader2 } from "lucide-react";
import { useEffect } from "react";

interface RepairUpdateCardProps {
  repair: AdminRepairDetail;
  onUpdate: (data: {
    status?: string;
    partsCost?: number;
    serviceCharge?: number;
    diagnosisNotes?: string;
  }) => void;
  onDelete: () => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

interface UpdateFormValues {
  status: string;
  partsCost: number | "";
  serviceCharge: number | "";
  diagnosisNotes: string;
}

export function RepairUpdateCard({
  repair,
  onUpdate,
  onDelete,
  isUpdating,
  isDeleting,
}: RepairUpdateCardProps) {
  const { register, handleSubmit, setValue, watch, reset } = useForm<UpdateFormValues>({
    defaultValues: {
      status: repair.status,
      partsCost: repair.partsCost ?? "",
      serviceCharge: repair.serviceCharge ?? "",
      diagnosisNotes: repair.notes || "",
    },
  });

  // Reset form when repair data changes (e.g. after successful update)
  useEffect(() => {
    reset({
      status: repair.status,
      partsCost: repair.partsCost ?? "",
      serviceCharge: repair.serviceCharge ?? "",
      diagnosisNotes: repair.notes || "",
    });
  }, [repair, reset]);

  const currentStatus = watch("status");

  const onSubmit = (data: UpdateFormValues) => {
    const payload: Record<string, string | number | null> = {};
    if (data.status !== repair.status) payload.status = data.status;
    
    const parsedPartsCost = data.partsCost === "" ? null : Number(data.partsCost);
    if (parsedPartsCost !== repair.partsCost) payload.partsCost = parsedPartsCost;

    const parsedServiceCharge = data.serviceCharge === "" ? null : Number(data.serviceCharge);
    if (parsedServiceCharge !== repair.serviceCharge) payload.serviceCharge = parsedServiceCharge;

    const trimmedNotes = data.diagnosisNotes.trim();
    if (trimmedNotes !== (repair.notes || "")) payload.diagnosisNotes = trimmedNotes;

    if (Object.keys(payload).length > 0) {
      onUpdate(payload);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold text-titleBlack">Update Repair</h2>
        <button
          onClick={onDelete}
          disabled={isDeleting}
          className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-50"
          title="Delete Repair"
        >
          {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Repair Status */}
        <div>
          <label className="block text-sm font-semibold text-titleBlack mb-2">
            Status
          </label>
          <Select
            value={currentStatus}
            onValueChange={(v) => setValue("status", v as string)}
          >
            <SelectTrigger className="w-full h-11 border-gray-200 text-titleBlack font-semibold">
              <SelectValue placeholder="Status">
                {currentStatus?.replace("_", " ")}
              </SelectValue>
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="picked_up">Picked Up</SelectItem>
              <SelectItem value="received">Received</SelectItem>
              <SelectItem value="diagnosing">Diagnosing</SelectItem>
              <SelectItem value="repairing">Repairing</SelectItem>
              <SelectItem value="ready_for_delivery">Ready For Delivery</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Costs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-titleBlack mb-2">
              Parts Cost ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register("partsCost")}
              className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-titleBlack focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-titleBlack mb-2">
              Service Charge ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register("serviceCharge")}
              className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-titleBlack focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Diagnosis Notes */}
        <div>
          <label className="block text-sm font-semibold text-titleBlack mb-2">
            Diagnosis Notes / Message
          </label>
          <textarea
            {...register("diagnosisNotes")}
            placeholder="Add any technical notes or message for the customer..."
            rows={4}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-titleBlack focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="w-full h-11 bg-brand text-white rounded-xl font-bold hover:bg-brand/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isUpdating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Updating...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </div>
  );
}
