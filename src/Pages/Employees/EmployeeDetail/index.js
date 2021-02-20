import { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ptBR as locale } from 'date-fns/locale';
import {
  FaAngleDown,
  FaAngleLeft,
  FaAngleUp,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaUserEdit,
  FaUserPlus,
  FaUserMinus,
  FaRegAddressCard,
  FaCalendarAlt,
  FaUserLock,
} from 'react-icons/fa';

import NotFound from '../../NotFound';
import EmployeeOrders from '../EmployeeOrders';
import { LoaderSpinner } from '../../../components';

import { ordersEmployee, removeEmployee, resetPassword } from '../../../services/employee';

import {
  Container,
  Header,
  Title,
  GoBack,
  ClientName,
  Action,
  Button,
  Menu,
  MenuTitle,
  SubMenu,
  MenuItem,
  Main,
  Card,
  Avatar,
  Body,
  Name,
  CPF,
  Address,
  Phone,
  Since,
  OrdersCount,
  Pending,
  Progress,
  Done,
  Late,
  Invoiced,
  OrdersCountTotal,
} from './styles';

const EmployeeDetail = () => {
  const params = useParams();
  const history = useHistory();

  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [error, setError] = useState(null);

  useEffect(async () => {
    setLoading(true);
    setError(null);
    try {
      const { employee } = await ordersEmployee(params);
      setEmployee(employee);
    } catch ({ response }) {
      setError(response);
    } finally {
      setLoading(false);
    }
  }, [params]);

  const handleActiveMenu = useCallback(event => {
    event.stopPropagation();
    if (event.currentTarget.dataset.id === 'menu') {
      setActive(!active);
    } else {
      setActive(false);
    }
  });

  const handleNew = useCallback(() => {
    history.push('/employees/create');
  });

  const handleEdit = useCallback(() => {
    history.push(`/employees/${params.id}/edit`, employee);
  });

  const handlePassReset = useCallback(async () => {
    const response = await swal({
      title: 'Resetar Password',
      text: `Você está preste a resetar o password para o funcionário: ${employee.name}.\nDeseja continuar?`,
      icon: 'warning',
      buttons: ['Não', 'Sim'],
    });

    if (response) {
      setLoading(true);
      setError(null);
      try {
        await resetPassword(params);
        setLoading(false);
        await swal({ title: 'Password resetado com sucesso', icon: 'success' });
      } catch ({ response }) {
        setError(response);
      } finally {
        setLoading(false);
      }
    }
  });

  const handleRemove = useCallback(async () => {
    const response = await swal({
      title: 'Excluir Funcionário',
      text: `Você está preste a excluir o funcionário: ${employee.name}.\nDeseja continuar?`,
      icon: 'warning',
      buttons: ['Não', 'Sim'],
    });

    if (response) {
      setLoading(true);
      setError(null);
      try {
        removeEmployee(params);
        setLoading(false);
        history.replace('/employees');
      } catch ({ response }) {
        setError(response);
      } finally {
        setLoading(false);
      }
    }
  });

  if (error) {
    return <NotFound />;
  }

  return loading ? (
    <Container>
      <LoaderSpinner size={300} />
    </Container>
    ) : (
    <Container onClick={handleActiveMenu}>
      <Header>
        <Title>
          <GoBack onClick={() => history.push('/employees')} title="Todos os funcionários">
            <FaAngleLeft size={20} />
            Funcionários
          </GoBack>
          <ClientName>{employee.name}</ClientName>
        </Title>
        <Action>
          <Menu data-id="menu" onClick={handleActiveMenu}>
            <MenuTitle title="Clique para mais ações">
              <p>Mais ações</p>
              {active ? <FaAngleUp size={20} /> : <FaAngleDown size={20} />}
            </MenuTitle>
            <SubMenu active={active}>
              <MenuItem
                title="Clique para adicionar um novo funcionário"
                onClick={handleNew}
              >
                <p>Novo</p>
                <FaUserPlus />
              </MenuItem>
              <MenuItem
                title="Clique para editar este funcionário"
                onClick={handleEdit}
              >
                <p>Editar</p>
                <FaUserEdit />
              </MenuItem>
              <MenuItem
                title="Clique para resetar o password deste funcionário"
                onClick={handlePassReset}
              >
                <p>Resetar password</p>
                <FaUserLock />
              </MenuItem>
              <MenuItem
                title="Clique para excluir este funcionário"
                onClick={handleRemove}
              >
                <p>Excluir</p>
                <FaUserMinus />
              </MenuItem>
            </SubMenu>
          </Menu>
        </Action>

      </Header>
      <Main>
        <Card
          color={employee.color}
          title={'Para editar este funcionário vá em Mais ações > Editar'}
          onClick={handleActiveMenu}
          data-id="menu"
        >
          <header>
            <Avatar color={employee.color}>{employee.initials}</Avatar>
          </header>
          <Body>
            <Name>
              <FaUser size={20} />
              <p>{employee.name}</p>
            </Name>
            <CPF>
              <FaRegAddressCard size={20} />
              <p>{employee.username}</p>
            </CPF>
            <Address>
              <FaMapMarkerAlt size={20} />
              <p>{employee.address || 'Não informado'}</p>
            </Address>
            <Phone>
              <FaPhone size={20} />
              <p>{employee.phone || 'Não informado'}</p>
            </Phone>
            <Since>
              <FaCalendarAlt size={20} />
              <p>{employee.created_at && `Nosso funcionário há ${formatDistanceToNow(parseISO(employee.created_at), { locale })}`}</p>
            </Since>
          </Body>
          <OrdersCount>
            <Pending>
              <p>Ordens Pendentes</p>
              <p>{employee.user_orders?.filter(({ status }) => status === 'pending').length}</p>
            </Pending>
            <Progress>
              <p>Ordens em Progresso</p>
              <p>{employee.user_orders?.filter(({ status }) => status === 'progress').length}</p>
            </Progress>
            <Done>
              <p>Ordens Concluídas</p>
              <p>{employee.user_orders?.filter(({ status }) => status === 'done').length}</p>
            </Done>
            <Late>
              <p>Ordens Atrasadas</p>
              <p>{employee.user_orders?.filter(({ status }) => status === 'late').length}</p>
            </Late>
            <Invoiced>
              <p>Ordens Faturadas</p>
              <p>{employee.user_orders?.filter(({ status }) => status === 'invoiced').length}</p>
            </Invoiced>
            <OrdersCountTotal>
              <p>Total</p>
              <p>{employee.user_orders?.length}</p>
            </OrdersCountTotal>
          </OrdersCount>
        </Card>
        <EmployeeOrders employee_orders={employee.user_orders} />
      </Main>
    </Container>
  );
};

export default EmployeeDetail;
