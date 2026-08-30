import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface ConfirmationStepProps {
  orderId: string;
}

export function ConfirmationStep({ orderId }: ConfirmationStepProps) {
  return (
    <div className="max-w-2xl mx-auto text-center animate-in fade-in zoom-in-95 duration-500 pb-5">
      <div className="flex justify-center mb-6">
        <Image
          src="/confirmation.webp"
          alt="Confirmation"
          width={300}
          height={300}
          className="object-contain w-auto h-auto"
        />
      </div>

      <h2 className="text-3xl font-bold text-primary mb-4">
        Repair Request Submitted!
      </h2>

      <p className="text-muted-foreground mb-6 text-lg">
        Thank you! Your repair request has been successfully placed. Our
        representative will call you very soon.
      </p>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8 inline-block min-w-[300px]">
        <p className="text-sm text-muted-foreground mb-1">Your Order ID</p>
        <p className="text-2xl font-mono font-bold text-primary tracking-wider">
          {orderId}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href="/"
          className={buttonVariants({
            size: "lg",
            className: "w-full sm:w-auto",
          })}>
          Return to Home
        </Link>
        <Link
          href="/dashboard"
          className={buttonVariants({
            variant: "outline",
            size: "lg",
            className: "w-full sm:w-auto",
          })}>
          View My Orders
        </Link>
      </div>
    </div>
  );
}
