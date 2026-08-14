import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import Container from "./Container";
import { LogoIcon } from "./icons/logo copy";
import { buttonVariants } from "./ui/button";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

export function MainNav() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center shrink-0">
          <LogoIcon className="h-6 w-26" />
        </Link>

        <nav className="hidden md:flex items-center">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-lg font-semibold text-secondary hover:text-brand transition-colors duration-200">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-6">
          <Link href="/cart" className="relative group p-1">
            <ShoppingCart className="size-6 text-secondary group-hover:text-primary transition-colors duration-200" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
              0
            </span>
          </Link>
          <Link
            href="/login"
            className={buttonVariants({
              variant: "ghost",
              className: "hover:bg-muted",
            })}>
            Log In
          </Link>
          <a
            href="tel:+8801516540594"
            className={buttonVariants({ variant: "brand" })}>
            +88-01516540594
          </a>
        </div>
      </Container>
    </header>
  );
}
