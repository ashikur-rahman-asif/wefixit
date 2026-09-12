import { useCallback, useState } from 'react';
import React from 'react';

type InteractiveEventProps<T extends HTMLElement = HTMLElement> = {
  readOnly?: boolean;
  onFocus?: React.FocusEventHandler<T>;
  onBlur?: React.FocusEventHandler<T>;
  onMouseEnter?: React.MouseEventHandler<T>;
  onMouseLeave?: React.MouseEventHandler<T>;
};

export function useInteractiveEvent<T extends HTMLElement = HTMLElement>({
  readOnly,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
}: InteractiveEventProps<T>) {
  const [isFocus, setIsFocus] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleOnFocus = useCallback(
    (e: React.FocusEvent<T>) => {
      if (readOnly) return;
      setIsFocus(true);
      onFocus?.(e);
    },
    [readOnly, onFocus]
  );

  const handleOnBlur = useCallback(
    (e: React.FocusEvent<T>) => {
      if (readOnly) return;
      setIsFocus(false);
      onBlur?.(e);
    },
    [readOnly, onBlur]
  );

  const handleOnMouseEnter = useCallback(
    (e: React.MouseEvent<T>) => {
      if (readOnly) return;
      setIsHover(true);
      onMouseEnter?.(e);
    },
    [readOnly, onMouseEnter]
  );

  const handleOnMouseLeave = useCallback(
    (e: React.MouseEvent<T>) => {
      if (readOnly) return;
      setIsHover(false);
      onMouseLeave?.(e);
    },
    [readOnly, onMouseLeave]
  );

  return { isFocus, isHover, handleOnFocus, handleOnBlur, handleOnMouseEnter, handleOnMouseLeave };
}
