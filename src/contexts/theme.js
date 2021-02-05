import { createContext, useCallback } from 'react';
import {
  ThemeProvider as StyledComponentsProvider,
  ThemeContext as StyledComponentsContext,
} from 'styled-components';

import { useLocalStorage } from '../hooks';

import { dark, light } from '../styles/themes';

const ThemeContext = createContext(StyledComponentsContext);

export const ThemeProvider = ({ children }) => {
  const [storageTheme, setStorageTheme] = useLocalStorage(
    '@roughwood:theme',
    light
  );

  const toogleTheme = useCallback(() => {
    setStorageTheme(storageTheme.title === 'light' ? dark : light);
  }, [storageTheme, setStorageTheme]);

  return (
    <StyledComponentsProvider theme={storageTheme}>
      <ThemeContext.Provider value={{ toogleTheme, ...storageTheme }}>
        {children}
      </ThemeContext.Provider>
    </StyledComponentsProvider>
  );
};

export default ThemeContext;
