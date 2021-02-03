import { BrowserRouter } from "react-router-dom";

import { GlobalStyle } from "./styles/global";

import Providers from './contexts';
import Layout from "./Layout";

const App = () => (
  <BrowserRouter>
    <Providers>
      <GlobalStyle />
      <Layout />
    </Providers>
  </BrowserRouter>
);

export default App;
