import { Container, Avatar, TextContainer, TextRule, TextName } from "./styles";
import useAuth from "../../../hooks/useAuth";

import avatar from '../../../assets/img/screenLoading.gif';

const HeaderProfile = () => {
  const { user } = useAuth();

  return (
    <Container>
      <Avatar src={avatar} alt="avatar" />
      <TextContainer>
        <TextRule>Admin</TextRule>
        <TextName>{user?.name}</TextName>
      </TextContainer>
    </Container>
  );
}

export default HeaderProfile;
