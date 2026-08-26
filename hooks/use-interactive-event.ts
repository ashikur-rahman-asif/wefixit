import React, { useCallback, useState } from 'react';

type InteractiveEventTypes<T extends HTMLElement = HTMLElement> = {
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
}: InteractiveEventTypes<T>) {
  const [isFocus, setIsFocus] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleOnFocus = useCallback(
    (e: React.FocusEvent<T>) => {
      if (readOnly === true) return false;
      setIsFocus((prevState) => !prevState);
      onFocus && onFocus(e); // eslint-disable-line no-unused-expressions
    },
    [readOnly, onFocus]
  );

  const handleOnBlur = useCallback(
    (e: React.FocusEvent<T>) => {
      if (readOnly === true) return false;
      setIsFocus(() => false);
      onBlur && onBlur(e); // eslint-disable-line no-unused-expressions
    },
    [readOnly, onBlur]
  );

  const handleOnMouseEnter = useCallback(
    (e: React.MouseEvent<T, MouseEvent>) => {
      if (readOnly === true) return false;
      setIsHover(() => true);
      onMouseEnter && onMouseEnter(e); // eslint-disable-line no-unused-expressions
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [readOnly]
  );

  const handleOnMouseLeave = useCallback(
    (e: React.MouseEvent<T, MouseEvent>) => {
      if (readOnly === true) return false;
      setIsHover(() => false);
      onMouseLeave && onMouseLeave(e);
      // eslint-disable-line no-unused-expressions
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [readOnly]
  );

  return {
    isFocus,
    isHover,
    handleOnFocus,
    handleOnBlur,
    handleOnMouseEnter,
    handleOnMouseLeave,
  };
}
