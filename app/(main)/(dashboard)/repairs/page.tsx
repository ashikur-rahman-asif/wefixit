import { CustomerRepairList } from "./_components/CustomerRepairList";

export const metadata = {
  title: "My Repairs | WeFixIt",
  description: "Track your repair history and status.",
};

export default function RepairsPage() {
  return <CustomerRepairList />;
}
