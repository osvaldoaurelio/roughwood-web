import { useLocation } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import { Container } from "./styles";

import HeaderProfile from "./Profile";
import HeaderMenu from './Menu';
import HeaderFooter from "./Footer";

const Header = () => {
  const { pathname } = useLocation();
  const { signed } = useAuth();


  const fullScreenPath = ["/signin", "/signup"];

  return (
    !fullScreenPath.includes(pathname) && signed && (
      <Container>
        <HeaderProfile />
        <hr />
        <HeaderMenu />
        <hr />
        <HeaderFooter />
      </Container>
    )
  );
};

export default Header;
