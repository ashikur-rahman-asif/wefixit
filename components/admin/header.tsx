"use client";

import { SheetTrigger } from "@/components/ui/sheet";
import { Bell, Menu, Search } from "lucide-react";
import Image from "next/image";

export function AdminHeader() {
  return (
    <header className="py-5 bg-white border-b border-gray-100 sticky top-0 z-10 flex items-center justify-between px-8 shrink-0">
      <div className="flex items-center gap-4">
        <SheetTrigger className="text-gray-400 hover:text-gray-600 transition-colors md:hidden shrink-0">
          <Menu className="w-5 h-5" />
        </SheetTrigger>

        <div>
          <h1 className="text-2xl font-bold text-titleBlack leading-tight">
            Dashboard
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <Search className="w-5 h-5" />
        </button>

        <button className="text-gray-400 hover:text-gray-600 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-white">
            1
          </span>
        </button>

        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-orange-100 cursor-pointer relative">
          <Image
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            alt="Profile"
            fill
            sizes="36px"
            className="object-cover bg-orange-50"
          />
        </div>
      </div>
    </header>
  );
}
