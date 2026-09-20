"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export function AuthInterceptor() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleUnauthorized = () => {
      if (pathname !== "/auth/login") {
        router.replace("/auth/login?reason=session-expired");
      }
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, [router, pathname]);

  return null;
}
