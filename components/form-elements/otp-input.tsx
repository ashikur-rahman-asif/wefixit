'use client';

import * as React from 'react';
import { OTPInput as InputOTPBase } from 'input-otp';

import { cn } from '@/lib/utils';
import { FieldError } from './field-error-text';
import { FieldHelperText } from './field-helper-text';
import { labelStyles } from './styles/label-styles';
import { roundedStyles } from './styles/rounded-styles';

export interface OTPInputProps
  extends Omit<React.ComponentPropsWithoutRef<typeof InputOTPBase>, 'size' | 'render' | 'children'> {
  label?: React.ReactNode;
  labelWeight?: keyof typeof labelStyles.weight;
  error?: string;
  helperText?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: keyof typeof roundedStyles;
  disabled?: boolean;
  required?: boolean;
  labelClassName?: string;
  errorClassName?: string;
  helperClassName?: string;
  containerClassName?: string;
}

const slotSizeStyles = {
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-14 w-14 text-xl',
};

export const OTPInput = React.forwardRef<
  React.ElementRef<typeof InputOTPBase>,
  OTPInputProps
>(
  (
    {
      className,
      containerClassName,
      label,
      labelWeight = 'medium',
      error,
      helperText,
      size = 'lg',
      rounded = 'lg',
      maxLength = 6,
      disabled,
      required,
      labelClassName,
      errorClassName,
      helperClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn(`otp-root`, 'flex flex-col', className)}>
        {label ? (
          <span
            className={cn(
              `input-label`,
              'block',
              labelStyles.size[size],
              labelStyles.weight[labelWeight],
              disabled && 'text-muted-foreground',
              labelClassName
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
        ) : null}

        <InputOTPBase
          ref={ref}
          maxLength={maxLength}
          disabled={disabled}
          containerClassName={cn('flex items-center gap-2', containerClassName)}
          render={({ slots }) => (
            <>
              {slots.map((slot, index) => (
                <OTPInputSlot 
                  key={index} 
                  {...slot} 
                  size={size} 
                  rounded={rounded} 
                  error={error} 
                />
              ))}
            </>
          )}
          {...props}
        />

        {!error && helperText ? (
          <FieldHelperText
            size={size}
            className={cn(
              `input-helper-text`,
              disabled && 'text-muted-foreground',
              helperClassName
            )}
          >
            {helperText}
          </FieldHelperText>
        ) : null}

        {error ? (
          <FieldError
            size={size}
            error={error}
            className={cn(`input-error-text`, errorClassName)}
          />
        ) : null}
      </div>
    );
  }
);
OTPInput.displayName = 'OTPInput';

interface OTPInputSlotProps {
  char: string | null;
  hasFakeCaret: boolean;
  isActive: boolean;
  error?: string;
  size?: keyof typeof slotSizeStyles;
  rounded?: keyof typeof roundedStyles;
}

function OTPInputSlot({
  char,
  hasFakeCaret,
  isActive,
  error,
  size = 'lg',
  rounded = 'lg',
}: OTPInputSlotProps) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center border transition-all',
        roundedStyles[rounded],
        slotSizeStyles[size],
        isActive && 'z-10 ring-[1.8px] ring-primary border-primary bg-transparent',
        !isActive && !error && 'border-gray-200 bg-transparent hover:border-primary',
        error && 'border-red-500 ring-[1.8px] ring-red-500 text-red-500',
        !isActive && error && 'hover:border-red-500'
      )}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-1/2 w-px animate-pulse bg-primary" />
        </div>
      )}
    </div>
  );
}
