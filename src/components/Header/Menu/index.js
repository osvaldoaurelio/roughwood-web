import { useCallback } from 'react';
import { NavLink } from "react-router-dom";
import swal from 'sweetalert';

import useAuth from '../../../hooks/useAuth';

import { Container, Nav, LinkContainer } from './styles';

const Menu = () => {
  const { signOut } = useAuth();

  const handleSignOut = useCallback(async () => {
    const response = await swal({
      title: 'Sair do sistema',
      text: 'Você está saindo do sistema, deseja continuar?',
      icon: 'warning',
      buttons: ['Não', 'Sim'],
    });

    response && signOut();
  }, [signOut]);

  return (
    <Container>
      <Nav>
        <LinkContainer>
          <NavLink
            to="/"
            exact
            activeClassName="active-link"
            title="Clique para visualizar o Dashboard"
          >Dashboard</NavLink>
        </LinkContainer>
        <LinkContainer>
          <NavLink
            to="/customers"
            activeClassName="active-link"
            title="Clique para gerenciar Clientes"
          >Clientes</NavLink>
        </LinkContainer>
        <LinkContainer>
          <NavLink
            to="/orders"
            activeClassName="active-link"
            title="Clique para gerenciar Ordens de Serviços"
          >Ordens de Serviços</NavLink>
        </LinkContainer>
        <LinkContainer>
          <NavLink
            to="/employees"
            activeClassName="active-link"
            title="Clique para gerenciar Funcionários"
          >Funcionários</NavLink>
        </LinkContainer>
        <LinkContainer>
          <NavLink
            to="/materials"
            activeClassName="active-link"
            title="Clique para gerenciar Estoque"
          >Estoque</NavLink>
        </LinkContainer>
        <LinkContainer onClick={handleSignOut}>
          <NavLink
            to="#"
            title="Clique para sair do sistema"
          >Sair</NavLink>
        </LinkContainer>
      </Nav>
    </Container>
  );
};

export default Menu;
