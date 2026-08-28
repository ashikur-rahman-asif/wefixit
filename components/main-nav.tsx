"use client";

import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "./container";
import { CrossIcon } from "./icons/cross";
import { HamburgerIcon } from "./icons/hamburger-menu";
import { LogoIcon } from "./icons/logo-copy";
import { buttonVariants } from "./ui/button";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Shop", href: "/shop" },
  { label: "Repair", href: "/repair" },
  { label: "Blog", href: "/blog" },
];

export function MainNav() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isTransparentMode = pathname === "/services";
  const isTransparent = isTransparentMode && !isScrolled;

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
        isTransparent
          ? "bg-transparent"
          : isScrolled
            ? "bg-[#F3F4F6]"
            : "bg-white",
      )}>
      <Container className="flex items-center justify-between py-5 md:py-6">
        <div className="flex items-center gap-3 md:gap-0">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={cn(
              "lg:hidden p-1 -ml-1 hover:text-brand transition-colors",
              isTransparent ? "text-white" : "text-secondary",
            )}
            aria-label="Open Menu">
            <HamburgerIcon className="w-7 h-7" />
          </button>

          <Link href="/" className="flex items-center shrink-0">
            <LogoIcon
              className="h-5 md:h-6 w-auto"
              color={isTransparent ? "white" : undefined}
            />
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
                      isActive
                        ? "text-brand"
                        : isTransparent
                          ? "text-white"
                          : "text-secondary",
                    )}>
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
            <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
              10
            </span>
          </Link>
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/auth/login"
              className={buttonVariants({
                variant: isTransparent ? "white-outline" : "default",
              })}>
              Log In
            </Link>
            <a
              href="tel:+8801516540594"
              className={buttonVariants({ variant: "brand" })}>
              +88-01516540594
            </a>
          </div>
        </div>
      </Container>

      <div
        className={cn(
          "fixed inset-0 bg-black/60 z-[998] transition-opacity duration-300 lg:hidden backdrop-blur-sm",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 h-dvh w-[80%] max-w-[320px] bg-white z-[999] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}>
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <Link
            href="/"
            className="flex items-center shrink-0"
            onClick={() => setIsMobileMenuOpen(false)}>
            <LogoIcon className="h-5 w-auto" />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-secondary hover:text-brand transition-colors bg-gray-50 hover:bg-gray-100 rounded-full"
            aria-label="Close Menu">
            <CrossIcon className="w-5 h-5 ml-1.5 mb-1.5" />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex-1 overflow-y-auto py-6 px-5 flex flex-col gap-8">
          <ul className="flex flex-col gap-6">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-semibold text-primary hover:text-brand transition-colors duration-200 block">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <hr className="border-gray-100" />

          {/* Drawer Actions */}
          <div className="flex flex-col gap-4">
            <Link
              href="/auth/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className={buttonVariants({
                variant: "default",
                className: "w-full justify-center text-base py-3",
              })}>
              Log In
            </Link>
            <a
              href="tel:+8801516540594"
              className={buttonVariants({
                variant: "brand",
                className: "w-full justify-center text-base py-3 shadow-sm",
              })}>
              +88-01516540594
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
