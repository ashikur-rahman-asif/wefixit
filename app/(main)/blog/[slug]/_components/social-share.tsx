"use client";

import { FacebookIcon } from "@/components/icons/facebook-icon";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import Link from "next/link";

export function SocialShare({ url = "#" }: { url?: string }) {
  return (
    <div className="flex items-center gap-4 py-6 border-t border-b border-black/5 mt-10">
      <span className="text-primary font-semibold">Share this article:</span>
      <div className="flex items-center gap-2">
        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-lightBrand hover:bg-brand/10 transition-colors"
        >
          <FacebookIcon className="w-5 h-5" />
        </Link>
        <Link
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-lightBrand hover:bg-brand/10 transition-colors"
        >
          <WhatsAppIcon className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
