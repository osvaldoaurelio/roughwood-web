import { useState, useEffect, useCallback } from "react";

const useLocalStorage = (key, defaultValue = null) => {
  const storageValue = localStorage.getItem(key);console.log(storageValue)
  
  const initValue = storageValue ? JSON.parse(storageValue) : null;

  const [value, setValue] = useState(initValue);
console.log(value);
  useEffect(() => {
    if (defaultValue) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      setValue(defaultValue);
    }
  }, [key, defaultValue]);

  const updatingValue = useCallback(newValue => {
    localStorage.setItem(key, JSON.stringify(newValue));

    return setValue(newValue);
  }, [key]);

  const removingValue = useCallback(() => {
    localStorage.removeItem(key);

    return setValue(null);
  }, [key]);

  return [value, updatingValue, removingValue];
};

export default useLocalStorage;
