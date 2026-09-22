import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "403 Forbidden | WeFixit",
  description: "You do not have permission to access this page.",
};
import { ShieldX } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ERROR_MESSAGES: Record<string, string> = {
  admin_checkout:
    "Admins cannot place orders or access customer dashboards. Please use a regular customer account.",
};

export default async function ForbiddenPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const errorCode = resolvedParams.error as string;
  const message =
    ERROR_MESSAGES[errorCode] ||
    "You don't have permission to access this page. This area is restricted to administrators only.";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
          <ShieldX className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-4xl font-bold text-primary mb-2">403</h1>
        <h2 className="text-xl font-semibold text-primary mb-3">Access Forbidden</h2>
        <p className="text-gray-500 mb-8">{message}</p>
        <Link href="/" className={buttonVariants({ variant: "brand" })}>
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
