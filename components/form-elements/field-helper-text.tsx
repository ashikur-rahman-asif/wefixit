'use client';

import React from 'react';

import { cn } from '@/lib/utils';

const helperTextStyles = {
  size: {
    sm: 'text-[11px] mt-0.5 text-gray-600',
    md: 'text-[13px] mt-0.5 text-gray-600',
    lg: 'text-[13px] mt-1 text-gray-600',
    xl: 'text-sm mt-1 text-gray-600',
  },
};

export interface FieldHelperTextProps
  extends React.HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  as?: 'div' | 'span';
  size?: keyof typeof helperTextStyles.size;
  className?: string;
}

export function FieldHelperText({
  size,
  as = 'div',
  children,
  className,
}: React.PropsWithChildren<FieldHelperTextProps>) {
  const Component = as;
  return (
    <Component
      role="alert"
      className={cn(size && helperTextStyles.size[size], className)}
    >
      {children}
    </Component>
  );
}

FieldHelperText.displayName = 'FieldHelperText';
