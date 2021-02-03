import { Container, Image } from "./styles";

import logo from "../../../assets/img/logo.png";

const Footer = () => (
  <>
    <hr />
    <Container>
      <Image src={logo} alt="logo" />
    </Container>
  </>
);

export default Footer;
