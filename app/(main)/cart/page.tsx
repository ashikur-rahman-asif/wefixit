"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";
import { useCartStore } from "@/store/cart-store";
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "@/components/ui/loader";

export default function CartPage() {
  const isMounted = useMounted();

  const {
    items,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
  } = useCartStore();

  if (!isMounted) {
    return (
      <Container className="py-6 md:py-8 min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader size="xl" />
        <p className="text-secondary font-medium">Loading your cart...</p>
      </Container>
    );
  }

  const subtotal = getTotalPrice();
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  return (
    <Container className="py-6 md:py-8">
      <div className="flex items-center gap-3 mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          Shopping Cart
        </h1>
        <span className="bg-brand/10 text-brand px-3 py-1 rounded-full font-medium text-sm">
          {items.length} {items.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-muted/10 rounded-3xl border border-border/50 text-center px-4">
          <div className="size-24 bg-muted/50 rounded-full flex items-center justify-center mb-6">
            <ShoppingCart className="size-10 text-secondary" />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">
            Your cart is empty
          </h2>
          <p className="text-secondary max-w-md mb-8">
            Looks like you haven&apos;t added anything to your cart yet. Browse
            our products and find something you love.
          </p>
          <Button
            render={<Link href="/shop" />}
            size="lg"
            className="rounded-full px-8">
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border/60 text-base font-bold text-primary">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-6 items-center py-4 md:py-6 border-b border-border/60 last:border-0">
                <div className="col-span-6 flex items-center gap-4 w-full">
                  <div className="relative size-20 md:size-24 rounded-2xl bg-[#F5F5F5] p-2 shrink-0 border border-border/30">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain mix-blend-multiply p-2"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted rounded-xl" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Link
                      href={`/product/asus-x509jb`}
                      className="font-semibold text-primary hover:text-brand transition-colors line-clamp-2 md:text-lg leading-tight">
                      {item.title}
                    </Link>
                    {item.color && (
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-border/40 shrink-0"
                          style={{ backgroundColor: item.color.hex }}
                        />
                        <span className="text-xs text-secondary capitalize">
                          {item.color.name}
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 p-1.5 -ml-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 mt-1 w-fit transition-colors cursor-pointer">
                      <Trash2 className="size-4" />
                      Remove
                    </button>
                  </div>
                </div>

                <div className="col-span-2 text-center w-full md:w-auto flex justify-between md:block items-center">
                  <span className="md:hidden text-secondary font-medium">
                    Price:
                  </span>
                  <span className="font-semibold text-primary text-lg">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                <div className="col-span-2 flex justify-center w-full md:w-auto mt-2 md:mt-0">
                  <div className="flex items-center justify-between w-[120px] bg-[#F5F5F5] rounded-full px-3 py-2 border border-border/40">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="text-[#605F5F] hover:text-black transition-colors disabled:opacity-50 cursor-pointer p-1"
                      disabled={item.quantity <= 1}>
                      <Minus className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                    <span className="text-black font-bold text-sm md:text-base">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="text-[#605F5F] hover:text-black transition-colors cursor-pointer p-1">
                      <Plus className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                <div className="col-span-2 text-right w-full md:w-auto flex justify-between md:block items-center mt-2 md:mt-0">
                  <span className="md:hidden text-secondary font-medium">
                    Total:
                  </span>
                  <span className="font-bold text-brand text-lg md:text-xl">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-[#F5F5F5]/60 border border-border/50 rounded-3xl p-6 md:p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Order Summary
              </h2>

              <div className="flex flex-col gap-4 text-sm md:text-base text-secondary border-b border-border/60 pb-6 mb-6">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="font-medium text-primary">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span className="font-medium text-primary">
                    ${shipping.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-primary">Total</span>
                <span className="text-3xl font-bold text-brand">
                  ${total.toFixed(2)}
                </span>
              </div>

              <Button
                render={<Link href="/checkout" />}
                className="w-full rounded-full h-14 text-base font-semibold group">
                Proceed to Checkout
                <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <div className="mt-6 text-center">
                <Link
                  href="/shop"
                  className="text-sm font-medium text-secondary hover:text-primary transition-colors underline-offset-4 hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
