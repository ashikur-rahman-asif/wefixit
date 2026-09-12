"use client";

import Container from "@/components/container";
import { useCartStore } from "@/store/cart-store";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckoutForm } from "./_components/checkout-form";
import { useMounted } from "@/hooks/use-mounted";
import { Loader } from "@/components/ui/loader";

export default function CheckoutPage() {
  const { items } = useCartStore();
  const isMounted = useMounted();

  if (!isMounted) {
    return (
      <Container className="py-6 md:py-8 min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader size="xl" />
        <p className="text-secondary font-medium">Loading checkout...</p>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container className="py-6 md:py-8 min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center py-20 bg-muted/10 rounded-3xl border border-border/50 text-center px-4 w-full max-w-2xl">
          <div className="size-24 bg-muted/50 rounded-full flex items-center justify-center mb-6">
            <ShoppingCart className="size-10 text-secondary" />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">
            Your cart is empty
          </h2>
          <p className="text-secondary max-w-md mb-8">
            You need to add items to your cart before proceeding to checkout.
          </p>
          <Button
            render={<Link href="/shop" />}
            size="lg"
            className="rounded-full px-8">
            Return to Shop
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-6 md:py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8 md:mb-12">
        Checkout
      </h1>

      <CheckoutForm />
    </Container>
  );
}
