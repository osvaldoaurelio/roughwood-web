import { useCallback } from 'react';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { AuthProvider } from "./contexts/auth";

import Layout from "./Layout";
import Routes from "./Routes/";

import usePersistedTheme from "./hooks/usePersistedTheme";

import { GlobalStyle } from "./styles/global";

import light from "./styles/themes/light";
import dark from "./styles/themes/dark";

const App = () => {
  const [theme, setTheme] = usePersistedTheme('theme', light);

  const toogleTheme = useCallback(() => {
    const newTheme = theme.title === 'light' ? dark : light;
    setTheme(newTheme)
  }, [theme]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AuthProvider>
          <Layout toogleTheme={toogleTheme}>
            <Routes />
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
