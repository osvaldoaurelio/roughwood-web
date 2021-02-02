import { createContext, useCallback } from "react";
import {
  ThemeProvider as Provider,
  ThemeContext as Context,
} from "styled-components";

import useLocalStorage from "../hooks/useLocalStorage";

import { dark, light } from "../styles/themes";

const ThemeContext = createContext(Context);

export const ThemeProvider = ({ children }) => {
  const [storageTheme, setStorageTheme] = useLocalStorage("@roughwood:theme", light);

  const toogleTheme = useCallback(() => {
    setStorageTheme(storageTheme.title === "light" ? dark : light);
  },[storageTheme, setStorageTheme]);
  console.log(storageTheme)

  return (
    <Provider theme={storageTheme}>
      <ThemeContext.Provider value={{ toogleTheme, ...storageTheme }}>
        {children}
      </ThemeContext.Provider>
    </Provider>
  );
};

export default ThemeContext;
