import Switch from 'react-switch';
import { FaMoon, FaSun } from 'react-icons/fa';

import {
  Container,
  SwitchContainer,
  Avatar,
  TextContainer,
  TextRule,
  TextName,
} from './styles';

import useAuth from '../../../hooks/useAuth';
import useTheme from '../../../hooks/useTheme';

import avatar from '../../../assets/img/avatar.gif';

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
