import { Container, Img, NotFoundText } from './styles';

import img_404 from '../../assets/img/404.png';

const NotFound = () => (
  <Container>
    <NotFoundText>Oops, parece que essa página não existe...</NotFoundText>
    <Img src={img_404} alt="Not found page" title="Not found page" />
  </Container>
);

export default NotFound;
