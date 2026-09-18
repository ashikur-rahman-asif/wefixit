import { SheetTrigger } from "@/components/ui/sheet";
import { Bell, Menu, Search, User } from "lucide-react";

export function AdminHeader() {
  return (
    <header className="py-5 bg-white border-b border-gray-100 sticky top-0 z-10 flex items-center justify-between px-8 shrink-0">
      <div className="flex items-center gap-4">
        <SheetTrigger className="text-gray-600 font-medium hover:text-gray-600 font-medium transition-colors md:hidden shrink-0">
          <Menu className="w-5 h-5" />
        </SheetTrigger>

        <div>
          <h1 className="text-2xl font-bold text-titleBlack leading-tight">
            Dashboard
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="text-gray-600 font-medium hover:text-gray-600 font-medium transition-colors">
          <Search className="w-5 h-5" />
        </button>

        <button className="text-gray-600 font-medium hover:text-gray-600 font-medium transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-white">
            1
          </span>
        </button>

        <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 bg-gray-50 text-gray-600 font-medium flex items-center justify-center cursor-pointer relative hover:bg-gray-100 transition-colors">
          <User className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
}
