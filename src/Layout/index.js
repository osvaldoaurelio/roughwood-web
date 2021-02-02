import Header from '../components/Header';

import { Container, Main } from './styles';

const Layout = ({ toogleTheme, children }) => (
  <Container>
    <Header toogleTheme={toogleTheme}/>
    <Main>
      {children}
    </Main>
  </Container>
);

export default Layout;
