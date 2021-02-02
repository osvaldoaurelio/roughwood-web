import Header from '../components/Header';

import { Container, Main } from './styles';

const Layout = ({ children }) => (
  <Container>
    <Header />
    <Main>
      {children}
    </Main>
  </Container>
);

export default Layout;
