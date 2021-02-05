import { BrowserRouter } from 'react-router-dom';

import Providers from './contexts';
import Layout from './Layout';

import { GlobalStyle } from './styles';

const App = () => (
  <BrowserRouter>
    <Providers>
      <Layout />
      <GlobalStyle />
    </Providers>
  </BrowserRouter>
);

export default App;
