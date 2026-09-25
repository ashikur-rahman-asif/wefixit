"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutGrid,
  Box,
  Users,
  Tag,
  FileText,
  UserCog,
  Star,
  Settings,
  LogOut,
  ChevronRight,
  Wrench,
  List,
  Award,
  Palette,
  Smartphone,
  Mail,
} from "lucide-react";
import { SheetContent, SheetTitle } from "@/components/ui/sheet";
import Logo from "@/components/icons/logo";
import { useAuthStore } from "@/stores/auth.store";
import { authApi } from "@/features/auth/api/auth.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/features/dashboard/api/admin-dashboard.api";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

function SidebarContent({ isCollapsed }: { isCollapsed?: boolean }) {
  const pathname = usePathname();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const router = useRouter();

  const { data: statsRes } = useQuery({
    queryKey: ["adminDashboardStats"],
    queryFn: dashboardApi.getDashboardStats,
    staleTime: 60 * 1000,
  });

  const newMessagesCount = statsRes?.data?.contactMessages?.new || 0;

  const handleLogout = () => {
    clearAuth();
    toast.success("Logged out successfully");
    router.replace("/auth/login");

    authApi.logout().catch((error) => {
      console.error("Logout failed on server", error);
    });
  };

  const isActive = (path: string) => {
    if (path === "#" || !path) return false;
    if (path === "/admin") {
      return pathname === "/admin";
    }
    return pathname?.startsWith(path);
  };

  const getLinkClasses = (path: string, hasRightArrow = false) => {
    return cn(
      "flex items-center rounded-xl transition-colors",
      isCollapsed
        ? "justify-center p-3"
        : hasRightArrow
          ? "justify-between px-4 py-3"
          : "px-4 py-3 gap-3",
      isActive(path)
        ? "bg-brand text-white"
        : "text-gray-300 font-medium hover:text-white hover:bg-white/5",
    );
  };

  const MENU_LINKS = [
    { title: "Dashboard", href: "/admin", icon: LayoutGrid },
    {
      title: "Products",
      icon: Box,
      children: [
        { title: "Product List", href: "/admin/products", icon: Box },
        { title: "Categories", href: "/admin/product-categories", icon: List },
        { title: "Brands", href: "/admin/product-brands", icon: Award },

        { title: "Colors", href: "/admin/colors", icon: Palette },
        { title: "Reviews", href: "/admin/product-reviews", icon: Star },
      ],
    },
    {
      title: "Repair",
      icon: Wrench,
      children: [
        { title: "Repair Orders", href: "/admin/repair-orders", icon: FileText },
        { title: "Devices", href: "/admin/devices", icon: Smartphone },
        { title: "Brands", href: "/admin/brands", icon: Award },
        { title: "Services", href: "/admin/services", icon: List },
      ],
    },
    { title: "Product Grades", href: "/admin/product-grades", icon: Star },
    {
      title: "Blogs",
      icon: FileText,
      children: [
        { title: "Blog List", href: "/admin/blogs", icon: FileText },
        { title: "Categories", href: "/admin/blog-categories", icon: List },
      ],
    },
    {
      title: "Contact Messages",
      href: "/admin/contact-messages",
      icon: Mail,
      badge: newMessagesCount > 0 ? newMessagesCount : undefined,
    },
    { title: "Customer", href: "#", icon: Users, hasRightArrow: true },
    {
      title: "Orders",
      href: "/admin/orders",
      icon: () => (
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            ></path>
          </svg>
        </div>
      ),
      isSmallText: true,
      hasRightArrow: true,
    },
    { title: "Coupons", href: "#", icon: Tag },
    { title: "Transactions", href: "#", icon: FileText },
    { title: "Users", href: "/admin/users", icon: UserCog },
  ];

  const OTHER_LINKS = [{ title: "Settings", href: "#", icon: Settings }];

  return (
    <div className="flex flex-col h-full bg-primary text-sm overflow-y-auto custom-scrollbar">
      <div
        className={cn(
          "h-20 flex items-center px-6 border-b border-transparent shrink-0",
          isCollapsed ? "justify-center" : "justify-start",
        )}
      >
        {!isCollapsed ? (
          <div className="w-32 text-white">
            <Logo className="w-full h-auto text-white" />
          </div>
        ) : (
          <div className="text-white font-bold text-xl">W</div>
        )}
      </div>

      <div className={cn("flex-1 py-6 space-y-8", isCollapsed ? "px-2" : "px-4")}>
        <div>
          {!isCollapsed && (
            <h2 className="text-[11px] text-gray-400 font-medium uppercase tracking-widest mb-4 px-4">
              MENU
            </h2>
          )}
          <ul className="space-y-1.5">
            {MENU_LINKS.map((link, index) => {
              if (link.children) {
                return (
                  <li key={index}>
                    <Accordion
                      key={`${index}-${pathname}`}
                      className="w-full space-y-0"
                      defaultValue={
                        link.children?.some((c) => isActive(c.href))
                          ? [link.title.toLowerCase()]
                          : []
                      }
                    >
                      <AccordionItem value={link.title.toLowerCase()} className="border-none">
                        <AccordionTrigger
                          className={cn(
                            "flex items-center cursor-pointer rounded-xl transition-colors font-medium hover:text-white hover:bg-white/5 hover:no-underline",
                            isCollapsed ? "justify-center p-3" : "justify-between px-4 py-3",
                            link.children?.some((c) => isActive(c.href))
                              ? "text-white bg-white/5"
                              : "text-gray-300",
                          )}
                          title={link.title}
                        >
                          <div className="flex items-center gap-3">
                            <link.icon className="w-5 h-5 shrink-0" />
                            {!isCollapsed && (
                              <span className="font-medium text-sm">{link.title}</span>
                            )}
                          </div>
                        </AccordionTrigger>

                        {!isCollapsed && (
                          <AccordionContent className="pb-0 pt-1">
                            <ul className="space-y-1 pl-4">
                              {link.children.map((child, childIdx) => (
                                <li key={childIdx}>
                                  <Link
                                    href={child.href}
                                    className={getLinkClasses(child.href)}
                                    title={child.title}
                                  >
                                    <child.icon className="w-4 h-4 shrink-0" />
                                    <span className="font-medium">{child.title}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        )}
                      </AccordionItem>
                    </Accordion>
                  </li>
                );
              }

              const Icon = link.icon;
              return (
                <li key={index}>
                  <Link
                    href={link.href!}
                    className={getLinkClasses(link.href!, link.hasRightArrow)}
                    title={link.title}
                  >
                    {link.hasRightArrow ? (
                      <>
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 shrink-0" />
                          {!isCollapsed && (
                            <span
                              className={cn(
                                "font-medium",
                                link.isSmallText ? "text-[13px] leading-none" : "",
                              )}
                            >
                              {link.title}
                            </span>
                          )}
                        </div>
                        {!isCollapsed && link.title === "Customer" && (
                          <ChevronRight className="w-4 h-4 shrink-0" />
                        )}
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 shrink-0" />
                          {!isCollapsed && <span className="font-medium">{link.title}</span>}
                        </div>
                        {!isCollapsed && link.badge && (
                          <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          {!isCollapsed && (
            <h2 className="text-[11px] text-gray-400 font-medium uppercase tracking-widest mb-4 px-4">
              OTHER
            </h2>
          )}
          <ul className="space-y-1.5">
            {OTHER_LINKS.map((link, index) => {
              const Icon = link.icon;
              return (
                <li key={index}>
                  <Link href={link.href} className={getLinkClasses(link.href)} title={link.title}>
                    <Icon className="w-5 h-5 shrink-0" />
                    {!isCollapsed && <span className="font-medium">{link.title}</span>}
                  </Link>
                </li>
              );
            })}
            <li>
              <button
                onClick={handleLogout}
                className={cn(
                  "w-full flex items-center rounded-xl text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors",
                  isCollapsed ? "justify-center p-3" : "px-4 py-3 gap-3",
                )}
                title="Logout"
              >
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
    <aside className="bg-primary h-screen hidden md:flex flex-col sticky top-0 transition-all duration-300 shrink-0 w-64">
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
