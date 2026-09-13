import Link from "next/link";
import {
  LayoutGrid,
  Box,
  Users,
  ShoppingCart,
  Tag,
  FileText,
  UserCog,
  Star,
  Settings,
  LogOut,
  ChevronRight
} from "lucide-react";
import { SheetContent, SheetTitle } from "@/components/ui/sheet";
import Logo from "@/components/icons/logo";

function SidebarContent({ isCollapsed }: { isCollapsed?: boolean }) {
  return (
    <div className="flex flex-col h-full bg-primary text-sm overflow-y-auto custom-scrollbar">
      <div className={`h-20 flex items-center px-6 border-b border-transparent shrink-0 ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
        {!isCollapsed ? (
          <div className="w-32 text-white">
            <Logo className="w-full h-auto text-white" />
          </div>
        ) : (
          <div className="text-white font-bold text-xl">W</div>
        )}
      </div>

      <div className={`flex-1 py-6 space-y-8 ${isCollapsed ? 'px-2' : 'px-4'}`}>
        <div>
          {!isCollapsed && <h2 className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-4 px-4">MENU</h2>}
          <ul className="space-y-1.5">
            <li>
              <Link href="#" className={`flex items-center rounded-xl bg-brand text-white transition-colors ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3 gap-3'}`} title="Dashboard">
                <LayoutGrid className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span className="font-medium">Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link href="#" className={`flex items-center rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3 gap-3'}`} title="Products">
                <Box className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span className="font-medium">Products</span>}
              </Link>
            </li>
            <li>
              <Link href="#" className={`flex items-center rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors ${isCollapsed ? 'justify-center p-3' : 'justify-between px-4 py-3'}`} title="Customer">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span className="font-medium">Customer</span>}
                </div>
                {!isCollapsed && <ChevronRight className="w-4 h-4 shrink-0" />}
              </Link>
            </li>
            <li>
              <Link href="#" className={`flex items-center rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors ${isCollapsed ? 'justify-center p-3' : 'justify-between px-4 py-3'}`} title="Orders">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span className="font-medium">Orders</span>}
                </div>
                {!isCollapsed && <ChevronRight className="w-4 h-4 shrink-0" />}
              </Link>
            </li>
            <li>
              <Link href="#" className={`flex items-center rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3 gap-3'}`} title="Coupons">
                <Tag className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span className="font-medium">Coupons</span>}
              </Link>
            </li>
            <li>
              <Link href="#" className={`flex items-center rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3 gap-3'}`} title="Transactions">
                <FileText className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span className="font-medium">Transactions</span>}
              </Link>
            </li>
            <li>
              <Link href="#" className={`flex items-center rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3 gap-3'}`} title="User Role">
                <UserCog className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span className="font-medium">User Role</span>}
              </Link>
            </li>
            <li>
              <Link href="#" className={`flex items-center rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3 gap-3'}`} title="Reviews">
                <Star className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span className="font-medium">Reviews</span>}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          {!isCollapsed && <h2 className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-4 px-4">OTHER</h2>}
          <ul className="space-y-1.5">
            <li>
              <Link href="#" className={`flex items-center rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3 gap-3'}`} title="Settings">
                <Settings className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span className="font-medium">Settings</span>}
              </Link>
            </li>
            <li>
              <button className={`w-full flex items-center rounded-xl text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3 gap-3'}`} title="Logout">
                <LogOut className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span className="font-medium">Logout</span>}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function AdminSidebar() {
  return (
    <aside 
      className="bg-primary h-screen hidden md:flex flex-col sticky top-0 transition-all duration-300 shrink-0 w-64"
    >
      <SidebarContent isCollapsed={false} />
    </aside>
  );
}

export function MobileSidebar() {
  return (
    <SheetContent side="left" className="p-0 w-64 border-r-0 bg-primary">
      <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
      <SidebarContent isCollapsed={false} />
    </SheetContent>
  );
}
