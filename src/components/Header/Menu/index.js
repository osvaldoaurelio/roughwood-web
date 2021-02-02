import { useCallback, useContext, useState } from 'react';
import { Link } from "react-router-dom";
import Switch from "react-switch";
import swal from 'sweetalert';
import { ThemeContext } from 'styled-components';

import useAuth from '../../../hooks/useAuth';

import { Container, Nav, LinkContainer, SwitchContainer } from './styles';

const HeaderMenu = ({ toogleTheme }) => {
  const { colors, title } = useContext(ThemeContext);
  const { signOut } = useAuth();

  const [check, setCheck] = useState(false);

  const handleSignOut = useCallback(async () => {
    const response = await swal({
      title: 'Sair do sistema',
      text: 'Você está saindo do sistema, deseja continuar?',
      icon: 'warning',
      buttons: ['Não', 'Sim'],
    });
  
    if (response) {
      signOut();
    }
  }, [signOut]);

  return (
    <Container>
      <Nav>
        <LinkContainer>
          <Link to="/" title="Clique para viaualizar o Dashboard">Dashboard</Link>
        </LinkContainer>
        <LinkContainer>
          <Link to="/customers" title="Clique para gerenciar Clientes">Clientes</Link>
        </LinkContainer>
        <LinkContainer>
          <Link to="/orders" title="Clique para gerenciar Ordens de Serviços">Ordens de Serviços</Link>
        </LinkContainer>
        <LinkContainer>
          <Link to="/employees" title="Clique para gerenciar Funcionários">Funcionários</Link>
        </LinkContainer>
        <LinkContainer>
          <Link to="/materials" title="Clique para gerenciar Estoque">Estoque</Link>
        </LinkContainer>
        <LinkContainer onClick={handleSignOut}>
          <Link to="#" title="Clique para sair do sistema">Sair</Link>
        </LinkContainer>
      </Nav>
      <SwitchContainer>
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
      </SwitchContainer>
    </Container>
  );
};

export default HeaderMenu;
