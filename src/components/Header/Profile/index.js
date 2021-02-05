import Switch from 'react-switch';
import { FaMoon, FaSun } from 'react-icons/fa';

import { useAuth, useTheme } from '../../../hooks';

import avatar from '../../../assets/img/avatar.gif';

import {
  Container,
  SwitchContainer,
  Avatar,
  TextContainer,
  TextRule,
  TextName,
} from './styles';

const Profile = () => {
  const { user } = useAuth();
  const { colors, title, toogleTheme } = useTheme();

  return (
    <>
      <Container>
        <SwitchContainer title="Clique para alternar entre os temas dark/light">
          <FaSun onClick={toogleTheme} />
          <Switch
            checked={title === 'dark'}
            onChange={toogleTheme}
            checkedIcon={false}
            uncheckedIcon={false}
            height={10}
            width={40}
            handleDiameter={20}
            offColor={colors.background}
            onColor={colors.secondary}
          />
          <FaMoon onClick={toogleTheme} />
        </SwitchContainer>
        <Avatar src={avatar} alt="avatar" />
        <TextContainer>
          <TextRule>Admin</TextRule>
          <TextName>{user.name}</TextName>
        </TextContainer>
      </Container>
      <hr />
    </>
  );
};

export default Profile;
