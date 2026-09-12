import { useSyncExternalStore } from "react";

// A no-op subscribe — this value never changes externally
const subscribe = () => () => {};

export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,  // client snapshot: always mounted
    () => false, // server snapshot: never mounted
  );
}
