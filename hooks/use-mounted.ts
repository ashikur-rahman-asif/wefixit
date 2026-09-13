import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,  // client snapshot: always mounted
    () => false, // server snapshot: never mounted
  );
}
