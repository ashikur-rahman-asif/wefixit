'use client';

import Image from 'next/image';

export function AuthSidebar() {
  return (
    <div className="hidden h-screen bg-red-100 lg:block">
      <Image
        alt="auth-image"
        src={'/auth.webp'}
        className="h-full w-full object-cover"
        width={1350}
        height={1920}
      />
    </div>
  );
}
