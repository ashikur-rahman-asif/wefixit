"use client";

import Container from "@/components/container";
import { User, ShoppingCart, Key, Wrench } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sidebarNavItems = [
  {
    title: "Profile Information",
    href: "/account",
    icon: User,
  },
  {
    title: "My Orders",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    title: "My Repairs",
    href: "/my-repairs",
    icon: Wrench,
  },
  {
    title: "Change Password",
    href: "/account/security",
    icon: Key,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="bg-[#f9f9f9] min-h-[calc(100vh-100px)] py-6 lg:py-10">
      <Container>
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-8">
          {}
          <aside className="lg:w-1/4 w-full shrink-0">
            <div className="bg-white rounded-xl border border-border/50 p-4 lg:p-6 sticky top-24 lg:top-28">
              <h3 className="text-base lg:text-lg font-bold text-primary mb-4 lg:mb-6 hidden lg:block">Manage Account</h3>
              <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
                {sidebarNavItems.map((item) => {
                  const isActive =
                    item.href === "/account"
                      ? pathname === item.href
                      : pathname === item.href || pathname.startsWith(`${item.href}/`);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 lg:gap-3 px-4 py-2 lg:py-3 rounded-full lg:rounded-lg text-sm font-medium transition-colors shrink-0 border",
                        isActive
                          ? "bg-brand text-white border-brand"
                          : "text-gray-600 bg-white border-gray-200 lg:border-transparent lg:bg-transparent hover:bg-gray-50 hover:text-brand"
                      )}
                    >
                      <Icon className={cn("w-4 h-4 lg:w-5 lg:h-5", isActive ? "text-white" : "text-gray-400 group-hover:text-brand")} />
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {}
          <div className="flex-1 min-w-0">
            {children}
          </div>
        </div>
      </Container>
    </div>
  );
}
