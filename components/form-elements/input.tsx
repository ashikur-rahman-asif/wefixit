'use client';

import React, { forwardRef } from 'react';

import { useInteractiveEvent } from '@/lib/hooks/use-interactive-event';
import { cn } from '@/lib/utils';

import { FieldClearButton } from './field-clear-button';
import { FieldError } from './field-error-text';
import { FieldHelperText } from './field-helper-text';
import { labelStyles } from './styles/label-styles';
import { roundedStyles } from './styles/rounded-styles';

const inputStyles = {
  base: 'flex items-center peer w-full transition duration-200 border [&.is-hover]:border-primary [&.is-focus]:border-primary [&_input::placeholder]:opacity-60',
  disabled: '!bg-muted/70 backdrop-blur cursor-not-allowed !border-muted',
  error:
    '!border-red [&.is-hover]:!border-red [&.is-focus]:!border-red !ring-red !bg-transparent',
  size: {
    sm: 'px-2 py-1 text-xs h-8',
    md: 'px-3.5 py-2 text-sm h-10',
    lg: 'px-4 py-2 text-base h-12',
    xl: 'px-5 py-2.5 text-base h-14',
  },
  rounded: roundedStyles,
  variant: {
    text: 'border-transparent ring-transparent bg-transparent',
    flat: 'border-0 ring-muted/70 [&.is-focus]:ring-[1.8px] [&.is-focus]:bg-transparent bg-muted/70 backdrop-blur',
    outline: 'border border-gray-200 bg-transparent',
  },
};

const inputFieldStyles = {
  base: 'w-full border-0 bg-transparent p-0 focus:outline-none focus:ring-0',
  reset:
    '[&::-ms-clear]:hidden [&::-ms-reveal]:hidden [&::-webkit-search-cancel-button]:hidden [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none',
  disabled: 'cursor-not-allowed placeholder:text-muted-foreground',
  clearable:
    '[&:placeholder-shown~.input-clear-btn]:opacity-0 [&:placeholder-shown~.input-clear-btn]:invisible [&:not(:placeholder-shown)~.input-clear-btn]:opacity-100 [&:not(:placeholder-shown)~.input-clear-btn]:visible',
  prefix: {
    size: {
      sm: 'ps-1.5',
      md: 'ps-2.5',
      lg: 'ps-3.5',
      xl: 'ps-4',
    },
  },
  suffix: {
    size: {
      sm: 'pe-1.5',
      md: 'pe-2.5',
      lg: 'pe-3.5',
      xl: 'pe-4',
    },
  },
};

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'type' | 'prefix' | 'suffix'
  > {
  type?:
    | 'text'
    | 'email'
    | 'number'
    | 'tel'
    | 'search'
    | 'url'
    | 'time'
    | 'date'
    | 'week'
    | 'month'
    | 'datetime-local';
  variant?: keyof typeof inputStyles.variant;
  size?: keyof typeof inputStyles.size;
  rounded?: keyof typeof inputStyles.rounded;
  placeholder?: string;
  disabled?: boolean;
  label?: React.ReactNode;
  labelWeight?: keyof typeof labelStyles.weight;
  clearable?: boolean;
  onClear?: (event: React.MouseEvent) => void;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: string;
  labelClassName?: string;
  inputClassName?: string;
  prefixClassName?: string;
  suffixClassName?: string;
  helperClassName?: string;
  errorClassName?: string;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      variant = 'outline',
      size = 'lg',
      rounded = 'lg',
      disabled,
      placeholder,
      label,
      labelWeight = 'medium',
      error,
      clearable,
      onClear,
      prefix,
      suffix,
      readOnly,
      helperText,
      labelClassName,
      inputClassName,
      errorClassName,
      helperClassName,
      prefixClassName,
      suffixClassName,
      onFocus,
      onBlur,
      required,
      ...inputProps
    },
    ref
  ) => {
    const {
      isFocus,
      isHover,
      handleOnBlur,
      handleOnFocus,
      handleOnMouseEnter,
      handleOnMouseLeave,
    } = useInteractiveEvent({
      readOnly,
      onBlur,
      onFocus,
    });

    return (
      <div className={cn(`input-root`, 'flex flex-col', className)}>
        <label className="block">
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

          <span
            className={cn(
              `input-container`,
              inputStyles.base,
              inputStyles.size[size],
              inputStyles.rounded[rounded],
              inputStyles.variant[variant],
              isHover && 'is-hover', // must have is-hover class based on mouse enter
              isFocus && 'is-focus', // must have is-focus class based on onFocus event
              disabled && inputStyles.disabled,
              error && inputStyles.error,
              inputClassName
            )}
            data-focus={isFocus}
            data-hover={isHover}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          >
            {prefix ? (
              <span
                className={cn(
                  `input-prefix`,
                  'whitespace-nowrap leading-normal',
                  prefixClassName
                )}
              >
                {prefix}
              </span>
            ) : null}

            <input
              ref={ref}
              type={type}
              disabled={disabled}
              onBlur={handleOnBlur}
              onFocus={handleOnFocus}
              readOnly={readOnly}
              required={required}
              spellCheck="false"
              // placeholder is a required prop for the clearable input component even if the user does not set any
              placeholder={placeholder || 'Screen reader only'}
              className={cn(
                `input-field`,
                inputFieldStyles.base,
                inputFieldStyles.reset,
                // it's important we are using placeholder-shown pseudo class to control input clear icon btn
                !placeholder && 'placeholder-shown:placeholder:opacity-0',
                disabled && inputFieldStyles.disabled,
                clearable && inputFieldStyles.clearable,
                prefix && inputFieldStyles.prefix.size[size],
                suffix && inputFieldStyles.suffix.size[size]
              )}
              style={{ fontSize: 'inherit' }}
              {...inputProps}
            />

            {clearable ? (
              <FieldClearButton
                as="span"
                size={size}
                onClick={onClear}
                hasSuffix={Boolean(suffix)}
              />
            ) : null}

            {suffix ? (
              <span
                className={cn(
                  `input-suffix`,
                  'whitespace-nowrap leading-normal',
                  suffixClassName
                )}
              >
                {suffix}
              </span>
            ) : null}
          </span>
        </label>

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

Input.displayName = 'Input';
