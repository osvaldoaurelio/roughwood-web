import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./contexts/auth";
import { ThemeProvider } from "./contexts/theme";

import Layout from "./Layout";
import Routes from "./Routes/";

import { GlobalStyle } from "./styles/global";

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <GlobalStyle />
      <AuthProvider>
        <Layout>
          <Routes />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
