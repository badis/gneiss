import { useState, useEffect } from "react";

function getStorageValue(key: string) {
  // getting stored value
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  }
}

export const useLocalStorage = (key: string) => {
  if (!key) throw new Error("Custom hooks > useLocalStorage: missing key");

  const [value, setValue] = useState(() => {
    return getStorageValue(key);
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      // storing input name
      if (value) localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  const removeValue = () => {
    if (typeof window !== "undefined") {
      setValue(null);
      localStorage.removeItem(key);
    }
  };

  return { value, setValue, removeValue };
};
