import { Button } from "@/components/ui/button";
import { ShippingIcon } from "@/components/icons/shipping-icon";
import { MastercardIcon } from "@/components/icons/mastercard-icon";
import { VisaCardIcon } from "@/components/icons/visa-icon";
import { PaypalIcon } from "@/components/icons/paypal-icon";
import { GpayIcon } from "@/components/icons/gpay-icon";
import { ApplePayIcon } from "@/components/icons/applepay-icon";

interface ProductActionsProps {
  isOutOfStock?: boolean;
}

export function ProductActions({ isOutOfStock = false }: ProductActionsProps) {
  return (
    <>
      {isOutOfStock ? (
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 my-6">
          <Button variant="outline" className="w-full text-red-500 border-red-200 bg-red-50 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed" disabled>
            Out of Stock
          </Button>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 my-6">
          <Button variant="default" className="w-full sm:flex-1 px-8">
            Add to Cart
          </Button>
          <Button variant="brand" className="w-full sm:flex-1 px-8">
            Buy Now
          </Button>
        </div>
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
