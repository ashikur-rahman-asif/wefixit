import Container from "@/components/container";
import Image from "next/image";
import { TrackForm } from "./_components/track-form";
import { TrackingStatus } from "./_components/tracking-status";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Order | WeFixIt",
  description: "Track the status of your device repair or order in real-time.",
};

export default async function TrackingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const orderId = typeof resolvedParams.orderId === "string" ? resolvedParams.orderId : undefined;
  const email = typeof resolvedParams.email === "string" ? resolvedParams.email : undefined;

  return (
    <Container className="py-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-3xl md:text-[40px] text-primary font-bold text-center uppercase">
          TRACK YOUR ORDER
        </h1>
        <p className="text-center mt-4 text-muted-foreground font-medium text-sm md:text-base px-4 max-w-xl">
          Please enter your Order ID (e.g., ORD-123456 or WFX-123456) as listed on your receipt to
          receive the up-to-date status of your order or repair.
        </p>
        <TrackForm />

        {orderId ? (
          <TrackingStatus orderId={orderId} email={email} />
        ) : (
          <div className="mt-12 md:mt-16 w-full max-w-2xl px-4 md:px-0 flex justify-center">
            <Image
              src="/order-tracking.webp"
              alt="Order Tracking Illustration"
              width={1000}
              height={375}
              className="w-full h-auto object-contain"
            />
          </div>
        )}
      </div>
    </Container>
  );
}
