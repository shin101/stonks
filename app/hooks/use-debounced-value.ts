import { useEffect, useState } from "react";

export const useDebouncedValue = (value: string, delay = 400) => {
  const [debouncedVal, setDebouncedVal] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedVal(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debouncedVal;
};
