import { useEffect, useState } from 'react';

const DEFAULT_DELAY = 300;

export function useDebounce<T>(value: T, delay = DEFAULT_DELAY) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}
