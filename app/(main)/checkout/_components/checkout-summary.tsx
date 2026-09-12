"use client";

import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import { useMemo } from "react";

export function CheckoutSummary() {
  const { items, getTotalPrice } = useCartStore();

  const { subtotal, shipping, total } = useMemo(() => {
    const subtotal = getTotalPrice();
    const shipping = subtotal > 0 ? 15 : 0;
    return { subtotal, shipping, total: subtotal + shipping };
  }, [getTotalPrice]);

  return (
    <div className="bg-[#F5F5F5]/60 border border-border/50 rounded-3xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-primary mb-6">Order Summary</h2>

      <div className="flex flex-col gap-4 mb-6 max-h-[300px] overflow-y-auto pr-2 pt-2 custom-scrollbar">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 items-center">
            <div className="relative size-16 rounded-xl bg-white p-1 border border-border/30 shrink-0">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain mix-blend-multiply p-1.5"
                />
              ) : (
                <div className="w-full h-full bg-muted rounded-lg" />
              )}
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-primary text-sm line-clamp-1">
                {item.title}
              </h4>
              {item.color && (
                <p className="text-xs text-secondary mt-0.5 capitalize">
                  Color: {item.color.name}
                </p>
              )}
            </div>
            <div className="font-semibold text-primary whitespace-nowrap">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 text-sm md:text-base text-secondary border-t border-border/60 pt-6 mb-6">
        <div className="flex justify-between items-center">
          <span>Subtotal</span>
          <span className="font-medium text-primary">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Shipping</span>
          <span className="font-medium text-primary">${shipping.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-border/60 pt-6">
        <span className="text-lg font-bold text-primary">Total</span>
        <span className="text-3xl font-bold text-brand">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
