import Header from '../components/Header';
import Routes from '../Routes';

import { Container, Main } from './styles';

const Layout = () => (
  <Container>
    <Header />
    <Main>
      <Routes />
    </Main>
  </Container>
);

export default Layout;
