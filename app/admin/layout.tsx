import { AdminHeader } from "@/components/admin/header";
import { AdminSidebar, MobileSidebar } from "@/components/admin/sidebar";
import { Sheet } from "@/components/ui/sheet";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Sheet>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <MobileSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </Sheet>
  );
}
