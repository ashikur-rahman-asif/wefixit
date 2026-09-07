import { Footer } from "@/components/footer";
import { MainNav } from "@/components/main-nav";
import Container from "@/components/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col">
      <MainNav />
      <main className="flex-1 flex flex-col w-full">
        <Container className="flex min-h-[70vh] flex-col items-center justify-center gap-6 py-16 text-center md:py-24">
          <div className="relative w-full max-w-[300px] aspect-[300/190] md:max-w-[380px]">
            <Image
              src="/not-found.webp"
              fill
              className="object-contain"
              alt="Page not found"
              sizes="(max-width: 768px) 300px, 380px"
              priority
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-3xl font-bold text-primary md:text-4xl lg:text-[40px]">
              Ooops! Page Not Found
            </h3>
            <p className="text-base font-medium text-[#757575] md:text-lg">
              Let&apos;s help you find what you&apos;re looking for!
            </p>
          </div>

          <Link
            href="/"
            className={cn(buttonVariants({ size: "lg" }), "mt-2 px-10")}>
            Home
          </Link>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
