"use client";

import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

export interface ImageWithSkeletonProps extends ImageProps {
  wrapperClassName?: string;
}

export function ImageWithSkeleton({
  className,
  wrapperClassName,
  alt = "",
  ...props
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={cn("relative w-full h-full flex items-center justify-center", wrapperClassName)}
    >
      {!isLoaded && <div className="absolute inset-0 bg-gray-200/60 animate-pulse rounded-md" />}
      <Image
        alt={alt}
        {...props}
        className={cn(
          className,
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
        )}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
