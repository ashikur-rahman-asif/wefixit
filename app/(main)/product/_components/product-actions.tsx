"use client";

import { ApplePayIcon } from "@/components/icons/applepay-icon";
import { GpayIcon } from "@/components/icons/gpay-icon";
import { MastercardIcon } from "@/components/icons/mastercard-icon";
import { PaypalIcon } from "@/components/icons/paypal-icon";
import { ShippingIcon } from "@/components/icons/shipping-icon";
import { VisaCardIcon } from "@/components/icons/visa-icon";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@/types/product";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ProductActionsProps {
  product: Product;
  isOutOfStock?: boolean;
}

export function ProductActions({
  product,
  isOutOfStock = false,
}: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);

  const productId = product.id ?? product.title;
  const isAlreadyInCart = items.some((item) => item.id === productId);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (isAlreadyInCart) return;

    addItem({
      id: productId,
      title: product.title,
      price: product.discountPrice ?? product.price,
      image: product.image,
      quantity,
    });
    toast.success(`${quantity} ${product.title} added to cart`);
  };

  return (
    <>
      {isOutOfStock ? (
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 my-6">
          <Button
            variant="outline"
            className="w-full text-red-500 border-red-200 bg-red-50 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed"
            disabled>
            Out of Stock
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between w-[70%] bg-[#F5F5F5] rounded-full px-4 py-2 mt-8">
            <button
              onClick={decrement}
              className="text-[#605F5F] hover:text-black transition-colors disabled:opacity-50 cursor-pointer"
              disabled={quantity <= 1 || isAlreadyInCart}
              aria-label="Decrease quantity">
              <Minus className="w-4 h-4" strokeWidth={2.5} />
            </button>
            <span className="text-black font-semibold text-base">
              {quantity}
            </span>
            <button
              onClick={increment}
              className="text-[#605F5F] hover:text-black transition-colors disabled:opacity-50 cursor-pointer"
              disabled={isAlreadyInCart}
              aria-label="Increase quantity">
              <Plus className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 my-6">
            <Button
              variant="default"
              className="w-full sm:flex-1 px-8 hover:bg-primary"
              onClick={handleAddToCart}
              disabled={isAlreadyInCart}>
              {isAlreadyInCart ? "Already in Cart" : "Add to Cart"}
            </Button>
            <Button variant="brand" className="w-full sm:flex-1 px-8">
              Buy Now
            </Button>
          </div>
        </>
      )}
      <div className="flex items-start sm:items-center gap-2">
        <ShippingIcon className="size-5 shrink-0 mt-0.5 sm:mt-0" />
        <span className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-1.5">
          <p className="text-primary font-medium text-sm">Shipping:</p>
          <p className="text-secondary font-semibold text-sm">
            Free for orders above $100
          </p>
        </span>
      </div>
      <p className="text-primary font-medium text-sm mt-5 sm:mt-4">
        Guaranteed & secure checkout
      </p>
      <div className="flex items-center flex-wrap gap-3 sm:gap-4 mt-3">
        <MastercardIcon className="h-5 sm:h-6 w-auto" />
        <VisaCardIcon className="h-4 sm:h-5 w-auto" />
        <PaypalIcon className="h-5 sm:h-6 w-auto" />
        <GpayIcon className="h-5 sm:h-6 w-auto" />
        <ApplePayIcon className="h-5 sm:h-6 w-auto" />
      </div>
    </>
  );
}
