import { useEffect, useState } from "react";

const PRE_NAME = "whatsapp-";

export const useLocalStorage = (key, initialValue = null) => {
  const storageName = PRE_NAME + key;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(storageName);
    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    }

    if (typeof initialValue === "function") {
      return initialValue();
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(storageName, JSON.stringify(value));
  }, [storageName, value]);

  return [value, setValue];
};
