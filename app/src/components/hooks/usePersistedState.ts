import { useEffect, useMemo, useState } from "react";

export function usePersistedState<T>(
  key: string,
  serialize: (value: T) => string,
  unserialize: (text: string) => T,
  initial: T
) {
  const initialValue = useMemo(() => {
    const text = window.localStorage.getItem(key);
    if (text) {
      return unserialize(text);
    }
    return initial;
  }, [key, initial]);

  const state = useState<T>(initialValue);

  const [value] = state;

  useEffect(() => {
    const text = serialize(value);
    window.localStorage.setItem(key, text);
  }, [value]);

  return state;
}
