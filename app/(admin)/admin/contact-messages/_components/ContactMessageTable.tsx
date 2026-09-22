"use client";

import { AdminContactMessage } from "@/types/admin";
import { Loader } from "@/components/ui/loader";
import { Mail, CheckCircle, Eye, Inbox } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

interface Props {
  messages: AdminContactMessage[];
  isLoading: boolean;
  onView: (msg: AdminContactMessage) => void;
}

export function ContactMessageTable({ messages, isLoading, onView }: Props) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-[20px] border border-gray-100 p-8 flex justify-center items-center min-h-[200px] shadow-sm">
        <Loader size="md" />
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="bg-white rounded-[20px] border border-gray-100 p-12 flex flex-col items-center justify-center text-center shadow-sm">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <Mail className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-titleBlack mb-1">No messages found</h3>
        <p className="text-textGray">There are no contact messages matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[20px] border border-gray-100 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#F8F9FB] border-b border-gray-100">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                Sender
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                Subject
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                Date
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto">
                Status
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-titleBlack text-sm h-auto text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((msg) => (
              <TableRow
                key={msg.id}
                className={cn(
                  "border-b border-gray-50 transition-colors cursor-pointer",
                  msg.status === "new" ? "bg-brand/5 hover:bg-brand/10" : "hover:bg-gray-50",
                )}
                onClick={() => onView(msg)}
              >
                <TableCell className="px-6 py-4">
                  <div className="font-semibold text-titleBlack text-sm">{msg.name}</div>
                  <div className="text-gray-500 font-medium text-xs mt-0.5">{msg.email}</div>
                  {msg.phone && <div className="text-gray-400 text-[11px] mt-0.5">{msg.phone}</div>}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-800 line-clamp-1 max-w-[300px]">
                    {msg.subject || "No Subject"}
                  </div>
                  <div className="text-xs text-gray-500 line-clamp-1 max-w-[300px] mt-1">
                    {msg.message}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-600 font-medium text-sm">
                  {dayjs(msg.created_at).format("MMM D, YYYY h:mm A")}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold",
                      msg.status === "new"
                        ? "bg-red-50 text-red-600"
                        : msg.status === "read"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-green-50 text-green-600",
                    )}
                  >
                    {msg.status === "new" && <Inbox className="w-3.5 h-3.5" />}
                    {msg.status === "read" && <Eye className="w-3.5 h-3.5" />}
                    {msg.status === "replied" && <CheckCircle className="w-3.5 h-3.5" />}
                    {msg.status === "replied" ? "Resolved" : msg.statusLabel}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onView(msg);
                    }}
                    className="inline-flex items-center justify-center text-sm font-medium text-brand hover:text-brand-dark hover:underline"
                  >
                    View Details
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
