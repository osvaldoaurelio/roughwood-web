import { useLocation } from "react-router-dom";

import Profile from "./Profile";
import Menu from "./Menu";
import Footer from "./Footer";

import useAuth from "../../hooks/useAuth";

import { Container } from "./styles";

const Header = () => {
  const { pathname } = useLocation();
  const { isUserSignedIn } = useAuth();

  const publicPaths = ["/signin", "/signup"];
  const isPrivateRoute = !publicPaths.includes(pathname);

  return (
    isPrivateRoute &&
    isUserSignedIn && (
      <Container>
        <Profile />
        <Menu />
        <Footer />
      </Container>
    )
  );
};

export default Header;
