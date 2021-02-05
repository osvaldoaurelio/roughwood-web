import loading from '../../assets/img/loading.gif';
import { Container, LoadingImage, LoadingTitle } from './styles';

const LoaderSpinner = ({ title, size = 28, titleColor = '#eee' }) => (
  <Container>
    <LoadingImage src={loading} size={size} alt={title || 'Carregando...'} />
    {title && <LoadingTitle titleColor={titleColor}>{title}</LoadingTitle>}
  </Container>
);

export default LoaderSpinner;
