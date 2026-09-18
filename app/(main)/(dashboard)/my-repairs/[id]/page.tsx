import { CustomerRepairDetail } from "./_components/CustomerRepairDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Repair Tracker | WeFixIt",
  description: "Track the real-time status of your device repair.",
};

interface PageProps {
  params: { id: string };
}

export default function RepairDetailsPage({ params }: PageProps) {
  return <CustomerRepairDetail repairId={params.id} />;
}
