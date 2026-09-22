"use client";

import { authApi } from "@/features/auth/api/auth.api";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth.store";
import { useCartStore } from "@/stores/cart.store";
import { LogOut, ShoppingCart, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import Container from "./container";
import { CrossIcon } from "./icons/cross";
import { HamburgerIcon } from "./icons/hamburger-menu";
import { LogoIcon } from "./icons/logo-copy";
import { buttonVariants } from "./ui/button";

const navItems = [
  { label: "Services", href: "/services" },

  { label: "Shop", href: "/shop" },
  { label: "Repair", href: "/repair" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export function MainNav() {
  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const cartItemsTotal = useCartStore((state) => state.getTotalItems());

  const mounted = useMounted();
  const totalItems = mounted ? cartItemsTotal : 0;

  const isTransparentMode = ["/services", "/contact", "/blog"].includes(pathname);
  const isTransparent = isTransparentMode && !isScrolled;

  const handleLogout = () => {
    clearAuth();
    toast.success("Logged out successfully");
    router.replace("/");

    authApi.logout().catch((error) => {
      console.error("Logout failed on server", error);
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "top-0 z-[990] transition-colors duration-300 w-full",
        isTransparentMode ? "fixed" : "sticky",
        isTransparent ? "bg-transparent" : isScrolled ? "bg-[#F3F4F6]" : "bg-white",
      )}
    >
      <Container className="flex items-center justify-between py-5 md:py-6">
        <div className="flex items-center gap-3 md:gap-0">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={cn(
              "lg:hidden p-1 -ml-1 hover:text-brand transition-colors",
              isTransparent ? "text-white" : "text-secondary",
            )}
            aria-label="Open Menu"
          >
            <HamburgerIcon className="w-7 h-7" />
          </button>

          <Link href="/" className="flex items-center shrink-0">
            <LogoIcon className="h-5 md:h-6 w-auto" color={isTransparent ? "white" : undefined} />
          </Link>
        </div>

        <nav className="hidden lg:flex items-center">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-lg font-medium hover:text-brand transition-colors duration-200 flex items-center gap-1",
                      isActive ? "text-brand" : isTransparent ? "text-white" : "text-secondary",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-5 md:gap-6">
          <Link href="/cart" className="relative group p-1">
            <ShoppingCart
              className={cn(
                "size-6 group-hover:text-brand transition-colors duration-200",
                isTransparent ? "text-white" : "text-secondary",
              )}
            />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+8801516540594" className={buttonVariants({ variant: "brand" })}>
              +88-01516540594
            </a>
            {!mounted ? (
              <div
                className={cn(
                  "h-[46px] w-[108px] animate-pulse rounded-full",
                  isTransparent ? "bg-white/20" : "bg-gray-200",
                )}
              />
            ) : isAuthenticated ? (
              <div className="relative group">
                <div className="h-10 w-10 rounded-full border-2 border-brand bg-white flex items-center justify-center cursor-pointer overflow-hidden transition-transform group-hover:scale-105 shadow-sm">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>

                <div className="absolute right-0 top-full pt-3 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-1000">
                  <div className="bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-gray-100 relative">
                    <div className="absolute -top-1.5 right-3.5 w-3 h-3 bg-white border-l border-t border-gray-100 transform rotate-45"></div>

                    <div className="px-4 py-3 border-b border-gray-100 relative z-10 bg-white rounded-t-xl">
                      <p className="text-base font-semibold text-gray-900 leading-tight">
                        {user?.name || user?.first_name || "User"}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{user?.phone || ""}</p>
                    </div>

                    <div className="py-2 relative z-10 bg-white rounded-b-xl flex flex-col gap-1 px-2">
                      <Link
                        href="/account"
                        className="flex items-center w-full text-gray-700 font-medium py-2 px-3 hover:bg-gray-50 hover:text-brand rounded-lg transition-colors"
                      >
                        <UserIcon className="mr-3 h-4 w-4" />
                        <span>Manage Account</span>
                      </Link>
                      <Link
                        href="/orders"
                        className="flex items-center w-full text-gray-700 font-medium py-2 px-3 hover:bg-gray-50 hover:text-brand rounded-lg transition-colors"
                      >
                        <ShoppingCart className="mr-3 h-4 w-4" />
                        <span>My Order</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-gray-700 font-medium py-2 px-3 hover:bg-gray-50 hover:text-brand rounded-lg transition-colors text-left"
                      >
                        <LogOut className="mr-3 h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className={buttonVariants({
                  variant: isTransparent ? "white-outline" : "default",
                })}
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </Container>

      <div
        className={cn(
          "fixed inset-0 bg-black/60 z-[998] transition-opacity duration-300 lg:hidden backdrop-blur-sm",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={cn(
          "fixed top-0 left-0 h-dvh w-[80%] max-w-[320px] bg-white z-[999] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <Link
            href="/"
            className="flex items-center shrink-0"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <LogoIcon className="h-5 w-auto" />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-secondary hover:text-brand transition-colors bg-gray-50 hover:bg-gray-100 rounded-full"
            aria-label="Close Menu"
          >
            <CrossIcon className="w-5 h-5 ml-1.5 mb-1.5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-5 flex flex-col gap-8">
          <ul className="flex flex-col gap-6">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-semibold text-primary hover:text-brand transition-colors duration-200 block"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <hr className="border-gray-100" />

          <div className="flex flex-col gap-4">
            {!mounted ? (
              <div className="w-full h-[52px] animate-pulse bg-gray-200 rounded-full" />
            ) : isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-2 border border-gray-100">
                  <div className="h-10 w-10 shrink-0 rounded-full border border-brand/20 bg-white flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {user?.name || user?.first_name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{user?.phone || ""}</p>
                  </div>
                </div>
                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center w-full text-gray-700 font-medium py-2.5 px-3 hover:bg-gray-50 hover:text-brand rounded-lg transition-colors"
                >
                  <UserIcon className="mr-3 h-5 w-5" />
                  <span>Manage Account</span>
                </Link>
                <Link
                  href="/orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center w-full text-gray-700 font-medium py-2.5 px-3 hover:bg-gray-50 hover:text-brand rounded-lg transition-colors"
                >
                  <ShoppingCart className="mr-3 h-5 w-5" />
                  <span>My Order</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full text-red-600 font-medium py-2.5 px-3 hover:bg-red-50 rounded-lg transition-colors text-left"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className={buttonVariants({
                  variant: "default",
                  className: "w-full justify-center text-base py-3",
                })}
              >
                Log In
              </Link>
            )}
            <a
              href="tel:+8801516540594"
              className={buttonVariants({
                variant: "brand",
                className: "w-full justify-center text-base py-3 shadow-sm",
              })}
            >
              +88-01516540594
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
