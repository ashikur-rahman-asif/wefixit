"use client";

import { useState } from "react";
import { AdminContactMessage } from "@/types/admin";
import {
  useUpdateContactMessage,
  useDeleteContactMessage,
} from "@/features/contact/hooks/use-admin-contact";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import dayjs from "dayjs";
import { Trash2, User, Mail, Phone, Clock, FileText } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  message: AdminContactMessage | null;
}

export function ContactMessageModal({ isOpen, onClose, message }: Props) {
  const updateMutation = useUpdateContactMessage();
  const deleteMutation = useDeleteContactMessage();

  const [status, setStatus] = useState<string>(message?.status || "new");
  const [adminNotes, setAdminNotes] = useState(message?.admin_notes || "");
  const [prevMessageId, setPrevMessageId] = useState(message?.id);

  if (message?.id !== prevMessageId) {
    setPrevMessageId(message?.id);
    setStatus(message?.status || "new");
    setAdminNotes(message?.admin_notes || "");
  }
  if (!message) return null;

  const handleSave = () => {
    updateMutation.mutate(
      {
        id: message.id,
        data: { status, admin_notes: adminNotes },
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this message?")) {
      deleteMutation.mutate(message.id, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl bg-white p-0 overflow-hidden border-0 shadow-xl rounded-2xl">
        <DialogHeader className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <DialogTitle className="text-xl font-bold text-titleBlack flex items-center justify-between">
            <span>Message Details</span>
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Sender Information
                </h4>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100">
                  <div>
                    <div className="text-[11px] text-gray-500 font-medium mb-0.5">Name</div>
                    <div className="text-sm font-semibold text-titleBlack">{message.name}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 font-medium mb-0.5">Email</div>
                    <div className="text-sm font-medium text-brand flex items-center gap-1.5">
                      <Mail className="w-3 h-3" />
                      <a href={`mailto:${message.email}`} className="hover:underline">
                        {message.email}
                      </a>
                    </div>
                  </div>
                  {message.phone && (
                    <div>
                      <div className="text-[11px] text-gray-500 font-medium mb-0.5">Phone</div>
                      <div className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                        <Phone className="w-3 h-3" />
                        <a href={`tel:${message.phone}`} className="hover:underline">
                          {message.phone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Message Info
                </h4>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100">
                  <div>
                    <div className="text-[11px] text-gray-500 font-medium mb-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Received On
                    </div>
                    <div className="text-sm font-medium text-titleBlack">
                      {dayjs(message.created_at).format("MMMM D, YYYY at h:mm A")}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 font-medium mb-0.5">Subject</div>
                    <div className="text-sm font-semibold text-titleBlack">
                      {message.subject || "No Subject Provided"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Message Content
            </h4>
            <div className="bg-white border border-gray-200 rounded-xl p-5 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap shadow-sm">
              {message.message}
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-gray-100">
            <h4 className="text-sm font-bold text-titleBlack">Management</h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1">
                <label className="text-xs font-semibold text-gray-700 block mb-2">Status</label>
                <Select value={status} onValueChange={(val) => setStatus(val || "new")}>
                  <SelectTrigger className="w-full h-11">
                    <SelectValue>
                      {status === "new"
                        ? "New"
                        : status === "read"
                          ? "Read"
                          : status === "replied"
                            ? "Replied (Resolved)"
                            : "Select status"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="replied">Replied (Resolved)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="text-xs font-semibold text-gray-700 block mb-2">
                  Admin Notes (Internal only)
                </label>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes about this inquiry..."
                  className="resize-none min-h-[100px]"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="m-0 px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <Button
            type="button"
            variant="ghost"
            onClick={handleDelete}
            disabled={deleteMutation.isPending || updateMutation.isPending}
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Message
          </Button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={updateMutation.isPending || deleteMutation.isPending}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="brand"
              onClick={handleSave}
              disabled={updateMutation.isPending || deleteMutation.isPending}
              className="flex-1 sm:flex-none"
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
