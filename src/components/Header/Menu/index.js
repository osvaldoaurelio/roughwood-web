import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';

import { useAuth } from '../../../hooks';

import { Container, Nav, NavItem } from './styles';

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
        <NavItem>
          <NavLink
            to="/"
            exact
            activeClassName="active-link"
            title="Clique para visualizar o Dashboard"
          >
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/customers"
            activeClassName="active-link"
            title="Clique para gerenciar Clientes"
          >
            Clientes
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/employees"
            activeClassName="active-link"
            title="Clique para gerenciar Funcionários"
          >
            Funcionários
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/orders"
            activeClassName="active-link"
            title="Clique para gerenciar Ordens de Serviços"
          >
            Ordens de Serviços
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/materials"
            activeClassName="active-link"
            title="Clique para gerenciar Materiais"
          >
            Materiais
          </NavLink>
        </NavItem>
        <NavItem onClick={handleSignOut}>
          <NavLink to="#" title="Clique para sair do sistema">
            Sair
          </NavLink>
        </NavItem>
      </Nav>
    </Container>
  );
};

export default Menu;
