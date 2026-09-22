"use client";

import { Input } from "@/components/form-elements/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminContactMessages } from "@/features/contact/hooks/use-admin-contact";
import { useDebounce } from "@/hooks/use-debounce";
import { AdminContactMessage } from "@/types/admin";
import { Mail, RefreshCw } from "lucide-react";
import { useState } from "react";
import { ContactMessageModal } from "./_components/ContactMessageModal";
import { ContactMessageTable } from "./_components/ContactMessageTable";

export default function ContactMessagesPage() {
  const [page] = useState(1);
  const [status, setStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, isFetching, refetch } = useAdminContactMessages({
    page,
    status: status !== "all" ? status : undefined,
    search: debouncedSearch || undefined,
  });

  const [selectedMessage, setSelectedMessage] = useState<AdminContactMessage | null>(null);

  const messages = data?.data || [];

  return (
    <div className="p-6 md:p-10 max-w-[1600px] mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-titleBlack flex items-center gap-2">
            <Mail className="w-6 h-6 text-brand" />
            Contact Messages
          </h1>
          <p className="text-textGray mt-1">Manage inquiries and messages from the contact form.</p>
        </div>

        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="bg-white p-4 rounded-[20px] border border-gray-100 flex flex-col md:flex-row gap-4 mb-6 shadow-sm">
        <div className="flex-1">
          <Input
            placeholder="Search by name, email or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={status} onValueChange={(val) => setStatus(val || "all")}>
            <SelectTrigger className="w-full h-11 bg-gray-50 border-gray-200">
              <SelectValue placeholder="Filter by status">
                {status === "all"
                  ? "All Statuses"
                  : status === "new"
                    ? "New"
                    : status === "read"
                      ? "Read"
                      : status === "replied"
                        ? "Replied (Resolved)"
                        : "Filter by status"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="replied">Replied (Resolved)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ContactMessageTable
        messages={messages}
        isLoading={isLoading}
        onView={(msg: AdminContactMessage) => setSelectedMessage(msg)}
      />

      <ContactMessageModal
        isOpen={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        message={selectedMessage}
      />
    </div>
  );
}
