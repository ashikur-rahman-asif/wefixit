"use client";

import { Input } from "@/components/form-elements/input";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useCheckoutStore } from "@/store/checkout-store";
import {
  CheckoutInput,
  checkoutSchema,
  getCheckoutDefaultValues,
} from "@/validators/checkout";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { StripePayment, StripePaymentRef } from "./stripe-payment";
import { CheckoutSummary } from "./checkout-summary";
import { useAuthStore } from "@/store/authStore";
import { Loader } from "@/components/ui/loader";

export function CheckoutForm() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { formData, updateFormData, resetCheckout } = useCheckoutStore();
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const stripeRef = useRef<StripePaymentRef>(null);

  const onPlaceOrderClick = () => {
    if (paymentMethod === "stripe") {
      stripeRef.current?.submit();
    } else {
      handleSubmit(onCODSubmit)();
    }
  };

  const total = useMemo(() => {
    const subtotal = getTotalPrice();
    return subtotal + (subtotal > 0 ? 15 : 0);
  }, [getTotalPrice]);

  const defaultValues = useMemo<CheckoutInput>(
    () => getCheckoutDefaultValues(user, formData),
    [user, formData]
  );

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues,
  });

  const paymentMethod = useWatch({
    control,
    name: "paymentMethod",
  });

  const onSuccessfulPayment = useCallback(
    () => {
      toast.success("Order placed successfully!");
      clearCart();
      resetCheckout();
      router.push("/order-success");
    },
    [clearCart, resetCheckout, router]
  );

  const onCODSubmit = useCallback(
    (formData: CheckoutInput) => {
      setIsSubmitting(true);
      
      const payloadForBackend = {
        customerInfo: formData,
        orderItems: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          color: item.color?.name || null
        }))
      };
      console.log("🚀 Payload ready for Laravel Backend:", payloadForBackend);

      setTimeout(() => {
        setIsSubmitting(false);
        onSuccessfulPayment();
      }, 1500);
    },
    [items, onSuccessfulPayment]
  );

  const handleStripeReady = useCallback(() => {
    updateFormData(getValues());
  }, [updateFormData, getValues]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start flex-col-reverse lg:flex-row">
      <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
      <div className="bg-[#F5F5F5]/60 border border-border/50 rounded-3xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Billing Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            placeholder="Ashikur"
            required
            inputClassName="!border-gray-400"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
          <Input
            label="Last Name"
            placeholder="Asif"
            required
            inputClassName="!border-gray-400"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="asif@gmail.com"
            required
            inputClassName="!border-gray-400"
            {...register("email")}
            error={errors.email?.message}
          />
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+1234567890"
            required
            inputClassName="!border-gray-400"
            {...register("phone")}
            error={errors.phone?.message}
          />
          <div className="md:col-span-2">
            <Input
              label="Street Address"
              placeholder="Jamalpur, BD"
              required
              inputClassName="!border-gray-400"
              {...register("address")}
              error={errors.address?.message}
            />
          </div>
          <Input
            label="Town / City"
            placeholder="New York"
            required
            inputClassName="!border-gray-400"
            {...register("city")}
            error={errors.city?.message}
          />
          <Input
            label="ZIP / Postal Code"
            placeholder="10001"
            required
            inputClassName="!border-gray-400"
            {...register("zipCode")}
            error={errors.zipCode?.message}
          />
        </div>
      </div>

      <div className="bg-[#F5F5F5]/60 border border-border/50 rounded-3xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Payment Method</h2>

        <div className="space-y-4 mb-6">
          <label
            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
              paymentMethod === "stripe"
                ? "border-brand bg-white"
                : "border-border/60 bg-transparent hover:border-brand/50"
            }`}
          >
            <input
              type="radio"
              value="stripe"
              className="w-5 h-5 accent-brand"
              {...register("paymentMethod")}
            />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center text-primary">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">Credit / Debit Card</h3>
                <p className="text-sm text-secondary">Secure payment via Stripe</p>
              </div>
            </div>
          </label>

          <label
            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
              paymentMethod === "cod"
                ? "border-brand bg-white"
                : "border-border/60 bg-transparent hover:border-brand/50"
            }`}
          >
            <input
              type="radio"
              value="cod"
              className="w-5 h-5 accent-brand"
              {...register("paymentMethod")}
            />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center text-primary">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">Cash on Delivery</h3>
                <p className="text-sm text-secondary">Pay when you receive the order</p>
              </div>
            </div>
          </label>
        </div>

        {errors.paymentMethod && (
          <p className="text-red-500 text-sm mb-4">{errors.paymentMethod.message}</p>
        )}

        {paymentMethod === "stripe" && (
          <StripePayment
            ref={stripeRef}
            amount={total}
            onSuccess={onSuccessfulPayment}
            onBeforePayment={handleSubmit(handleStripeReady)}
          />
        )}
      </div>
    </div>

    <div className="lg:col-span-5 sticky top-24 order-1 lg:order-2">
      <CheckoutSummary />
      <Button
        type="button"
        disabled={isSubmitting}
        onClick={onPlaceOrderClick}
        className="w-full rounded-full h-14 text-base font-semibold mt-6 flex items-center justify-center gap-2"
      >
        {isSubmitting && <Loader size="sm" className="border-white/30 border-t-white" />}
        {isSubmitting ? "Placing Order..." : paymentMethod === "stripe" ? `Pay $${total.toFixed(2)}` : "Place Order (COD)"}
      </Button>
    </div>
  </div>
  );
}
