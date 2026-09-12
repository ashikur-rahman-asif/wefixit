"use client";

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, forwardRef, useImperativeHandle } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_51O7c... dummy key ... Just to render UI"
);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#1a1a2e",
      fontFamily: "inherit",
      "::placeholder": { color: "#9ca3af" },
    },
    invalid: { color: "#ef4444" },
  },
};

interface StripePaymentProps {
  amount: number;
  onSuccess: (orderId?: string) => void;
  onBeforePayment: () => Promise<void>;
}

export interface StripePaymentRef {
  submit: () => void;
}

const CardPaymentForm = forwardRef<StripePaymentRef, StripePaymentProps>(({ onSuccess, onBeforePayment }, ref) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [nameOnCard, setNameOnCard] = useState("");

  const submitPayment = async () => {

    if (!stripe || !elements) return;

    await onBeforePayment();

    setErrorMessage(null);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: nameOnCard || undefined,
      },
    });

    if (error) {
      setErrorMessage(error.message ?? "Payment failed. Please try again.");
      return;
    }

    console.log("PaymentMethod created:", paymentMethod.id);

    setTimeout(() => {
      onSuccess("WFX-" + Math.floor(100000 + Math.random() * 900000));
    }, 1500);
  };

  useImperativeHandle(ref, () => ({
    submit: submitPayment,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitPayment();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-primary mb-2">
          Name on Card
        </label>
        <input
          type="text"
          value={nameOnCard}
          onChange={(e) => setNameOnCard(e.target.value)}
          placeholder="Ashikur Asif"
          required
          className="w-full px-4 py-3 rounded-xl border border-border/60 bg-white text-primary text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-2">
          Card Information
        </label>
        <div className="border border-border/60 rounded-xl p-4 bg-white focus-within:ring-2 focus-within:ring-brand focus-within:border-transparent transition-all">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </div>

      {errorMessage && (
        <p className="text-red-500 text-sm mt-3">{errorMessage}</p>
      )}

      <p className="text-xs text-secondary text-center mt-4 flex items-center justify-center gap-1">
        🔒 Secured by Stripe — your card details are never stored on our servers.
      </p>
    </form>
  );
});
CardPaymentForm.displayName = "CardPaymentForm";

export const StripePayment = forwardRef<StripePaymentRef, StripePaymentProps>((props, ref) => {
  return (
    <div className="border border-border/60 rounded-xl p-5 bg-white/50 mt-4">
      <Elements stripe={stripePromise}>
        <CardPaymentForm {...props} ref={ref} />
      </Elements>
    </div>
  );
});
StripePayment.displayName = "StripePayment";
