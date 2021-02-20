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
} from 'react-icons/fa';

import NotFound from '../../NotFound';
import CustomerOrders from '../CustomerOrders';
import { LoaderSpinner } from '../../../components';

import { ordersCustomer, removeCustomer } from '../../../services/customer';

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

const CustomerDetail = () => {
  const params = useParams();
  const history = useHistory();

  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [error, setError] = useState(null);

  useEffect(async () => {
    setLoading(true);
    setError(null);
    try {
      const { customer } = await ordersCustomer(params);
      setCustomer(customer);
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
    history.push('/customers/create');
  });

  const handleEdit = useCallback(() => {
    history.push(`/customers/${params.id}/edit`, customer);
  });

  const handleRemove = useCallback(async () => {
    const response = await swal({
      title: 'Excluir Cliente',
      text: `Você está preste a excluir o cliente: ${customer.name}.\nDeseja continuar?`,
      icon: 'warning',
      buttons: ['Não', 'Sim'],
    });

    if (response) {
      setLoading(true);
      setError(null);
      try {
        removeCustomer(params);
        setLoading(false);
        history.replace('/customers');
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
          <GoBack onClick={() => history.push('/customers')} title="Todos os clientes">
            <FaAngleLeft size={20} />
            Clientes
          </GoBack>
          <ClientName>{customer.name}</ClientName>
        </Title>
        <Action>
          <Menu data-id="menu" onClick={handleActiveMenu}>
            <MenuTitle title="Clique para mais ações">
              <p>Mais ações</p>
              {active ? <FaAngleUp size={20} /> : <FaAngleDown size={20} />}
            </MenuTitle>
            <SubMenu active={active}>
              <MenuItem
                title="Clique para adicionar um novo cliente"
                onClick={handleNew}
              >
                <p>Novo</p>
                <FaUserPlus />
              </MenuItem>
              <MenuItem
                title="Clique para editar este cliente"
                onClick={handleEdit}
              >
                <p>Editar</p>
                <FaUserEdit />
              </MenuItem>
              <MenuItem
                title="Clique para excluir este cliente"
                onClick={handleRemove}
              >
                <p>Excluir</p>
                <FaUserMinus />
              </MenuItem>
            </SubMenu>
          </Menu>
          <Button
            type="button"
            title="Clique para criar uma nova Ordem de Serviço para este cliente"
            onClick={() => history.push('/orders/create', { id: customer.id, name: customer.name })}
          >
            Nova Ordem de Serviço
          </Button>
        </Action>

      </Header>
      <Main>
        <Card
          color={customer.color}
          title={'Para editar este cliente vá em Mais ações > Editar'}
          onClick={handleActiveMenu}
          data-id="menu"
        >
          <header>
            <Avatar color={customer.color}>{customer.initials}</Avatar>
          </header>
          <Body>
            <Name>
              <FaUser size={20} />
              <p>{customer.name}</p>
            </Name>
            <CPF>
              <FaRegAddressCard size={20} />
              <p>{customer.cpf}</p>
            </CPF>
            <Address>
              <FaMapMarkerAlt size={20} />
              <p>{customer.address || 'Não informado'}</p>
            </Address>
            <Phone>
              <FaPhone size={20} />
              <p>{customer.phone || 'Não informado'}</p>
            </Phone>
            <Since>
              <FaCalendarAlt size={20} />
              <p>{customer.created_at && `Nosso cliente há ${formatDistanceToNow(parseISO(customer.created_at), { locale })}`}</p>
            </Since>
          </Body>
          <OrdersCount>
            <Pending>
              <p>Ordens Pendentes</p>
              <p>{customer.customer_orders?.filter(({ status }) => status === 'pending').length}</p>
            </Pending>
            <Progress>
              <p>Ordens em Progresso</p>
              <p>{customer.customer_orders?.filter(({ status }) => status === 'progress').length}</p>
            </Progress>
            <Done>
              <p>Ordens Concluídas</p>
              <p>{customer.customer_orders?.filter(({ status }) => status === 'done').length}</p>
            </Done>
            <Late>
              <p>Ordens Atrasadas</p>
              <p>{customer.customer_orders?.filter(({ status }) => status === 'late').length}</p>
            </Late>
            <Invoiced>
              <p>Ordens Faturadas</p>
              <p>{customer.customer_orders?.filter(({ status }) => status === 'invoiced').length}</p>
            </Invoiced>
            <OrdersCountTotal>
              <p>Total</p>
              <p>{customer.customer_orders?.length}</p>
            </OrdersCountTotal>
          </OrdersCount>
        </Card>
        <CustomerOrders customer_orders={customer.customer_orders} />
      </Main>
    </Container>
  );
};

export default CustomerDetail;
