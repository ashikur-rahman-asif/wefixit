import { useEffect, useState } from "react";

export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  return mounted;
}
