import { buttonVariants } from "@/components/ui/button";
import Container from "@/components/container";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Confirmed — WeFixit",
  description: "Your order has been successfully placed.",
};


import { ConfettiEffect } from "./_components/confetti-effect";

export default async function OrderSuccessPage() {

  return (
    <>
      <ConfettiEffect />
      <Container className="py-12 md:py-20 min-h-[70vh] flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto text-center">
        <div className="flex justify-center mb-6">
          <Image
            src="/confirmation.webp"
            alt="Order Confirmed"
            width={280}
            height={280}
            className="object-contain w-auto h-auto"
            priority
          />
        </div>

        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9 text-green-500" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          Order Confirmed!
        </h1>
        <p className="text-secondary text-lg mb-8 max-w-md mx-auto leading-relaxed">
          Thank you for your purchase. We&apos;ve received your order and will
          start processing it right away.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/shop"
            className={buttonVariants({
              size: "lg",
              className: "rounded-full px-10",
            })}
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "rounded-full px-10",
            })}
          >
            Return to Home
          </Link>
        </div>
      </div>
    </Container>
    </>
  );
}
