"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteRepairEvent } from "@/features/repairs/hooks/use-admin-repair";
import { getOrderStatusColor } from "@/lib/utils";
import { AdminRepairDetail } from "@/types/admin";
import dayjs from "dayjs";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

export function RepairTimeline({ repair }: { repair: AdminRepairDetail }) {
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);
  const deleteMutation = useDeleteRepairEvent(repair.reference);

  const handleDelete = () => {
    if (eventToDelete === null) return;
    deleteMutation.mutate(eventToDelete, {
      onSuccess: () => setEventToDelete(null),
    });
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-titleBlack">Timeline</h2>
          <p className="text-textGray text-sm font-medium mt-0.5">
            History of repair status updates
          </p>
        </div>
        <div className="p-6">
          {repair.timeline.length > 0 ? (
            <div className="space-y-6">
              {repair.timeline.map((event, idx) => (
                <div key={event.id} className="flex gap-4 relative group">
                  {idx !== repair.timeline.length - 1 && (
                    <div className="absolute left-2.5 top-7 -bottom-6 w-0.5 bg-gray-100"></div>
                  )}
                  <div
                    className={`w-5 h-5 mt-1 rounded-full border-2 shrink-0 z-10 ${getOrderStatusColor(
                      event.status,
                    )}`}></div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-titleBlack text-sm flex items-center gap-1">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[11px] capitalize ${getOrderStatusColor(
                              event.status,
                            )}`}>
                            {event.title}
                          </span>
                        </p>
                        <p className="text-xs font-semibold text-textGray mt-1">
                          {event.user
                            ? `By ${event.user.firstName} ${event.user.lastName}`
                            : "System update"}{" "}
                          on{" "}
                          {dayjs(event.occurredAt).format("MMM D, YYYY h:mm A")}
                        </p>
                      </div>

                      {repair.timeline.length > 1 && (
                        <button
                          onClick={() => setEventToDelete(event.id)}
                          className="opacity-0 group-hover:opacity-100 w-8 h-8 flex items-center justify-center rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                          title="Remove Timeline Event">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {event.description && (
                      <p className="text-sm font-medium text-gray-600 font-medium mt-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-textGray font-semibold">
              No timeline events found.
            </p>
          )}
        </div>
      </div>

      <AlertDialog
        open={eventToDelete !== null}
        onOpenChange={(open) => !open && setEventToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Timeline Event?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this event? This action cannot be
              undone. If this is the latest event, the repair status will be
              rolled back to the previous milestone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={deleteMutation.isPending}
              className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2">
              {deleteMutation.isPending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              Remove Event
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
