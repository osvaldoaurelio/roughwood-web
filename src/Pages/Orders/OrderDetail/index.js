import { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { formatDistanceToNow, format, parseISO } from 'date-fns';
import { ptBR as locale } from 'date-fns/locale';
import swal from 'sweetalert';

import {
  FaAngleDown,
  FaAngleLeft,
  FaAngleUp,
  FaFileSignature,
  FaFileMedical,
  FaFileExcel,
  FaClipboardList,
  FaClipboardCheck,
} from 'react-icons/fa';

import NotFound from '../../NotFound';
import { options, status } from '../../../utils';
import { LoaderSpinner } from '../../../components';
import { removeOrder, showOrder, invoiceOrder } from '../../../services/order';

import {
  Container,
  Header,
  Title,
  GoBack,
  OrderStatus,
  Action,
  BtnInvoice,
  Menu,
  MenuTitle,
  SubMenu,
  MenuItem,
  Main,
  Card,
  OrderId,
  OrderRelated,
  OrderDescription,
  OrderDates,
  OrderUsedMaterials,
  OrderPrice,
} from './styles';

const OrderDetail = () => {
  const params = useParams();
  const history = useHistory();

  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [error, setError] = useState(null);

  useEffect(async () => {
    setLoading(true);
    setError(null);
    try {
      const { order } = await showOrder(params);
      setOrder(order);
    } catch ({ response }) {
      setError(response);
    } finally {
      setLoading(false);
    }
  }, [params]);

  const handleInvoice = async () => {
    const response = await swal({
      title: 'Faturar Ordem de Serviço',
      text: `Você está preste a faturar e finalizar a ordem: ${`000000${order.id}`.slice(-7)}.\nDeseja continuar?`,
      icon: 'warning',
      buttons: ['Não', 'Sim'],
    });

    if (response) {
      setLoading(true);
      setError(null);
      try {
        const { order } = await invoiceOrder(params);
        setOrder(order);
        setLoading(false);
        await swal({ title: 'Ordem de serviço faturada e finalizada com sucesso', icon: 'success' });
      } catch ({ response }) {
        setError(response);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleActiveMenu = useCallback(event => {
    event.stopPropagation();

    if (event.currentTarget.dataset.id === 'menu') {
      setActive(!active);
    } else {
      setActive(false);
    }
  });

  const handleNew = useCallback(() => {
    history.push('/orders/create');
  });

  const handleEdit = useCallback(() => {
    history.push(`/orders/${params.id}/edit`, order);
  });

  const handleRemove = useCallback(async () => {
    const response = await swal({
      title: 'Excluir Ordem de Serviço',
      text: `Você está preste a excluir a ordem: ${`000000${order.id}`.slice(-7)}.\nDeseja continuar?`,
      icon: 'warning',
      buttons: ['Não', 'Sim'],
    });

    if (response) {
      setLoading(true);
      setError(null);
      try {
        removeOrder(params);
        setLoading(false);
        history.replace('/orders');
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
          <GoBack onClick={() => history.push('/Orders')} title="Todas as ordens">
            <FaAngleLeft size={20} />
            Ordens
          </GoBack>
          <OrderStatus>Esta ordem está {status(order.status)?.text}</OrderStatus>
        </Title>
        <Action>
          {order.status === 'done' && (
            <BtnInvoice
              title="Clique aqui para faturar e finalizar esta ordem de serviço"
              onClick={handleInvoice}
            >
              Faturar
            </BtnInvoice>
          )}
          {order.status === 'invoiced' && (
            <BtnInvoice
              title="Clique aqui para cadastrar uma nova ordem de serviço"
              onClick={() => history.push('/orders/create')}
              primaryColor={true}
            >
              Nova Ordem
            </BtnInvoice>
          )}
          {order.status !== 'invoiced' && (
            <Menu data-id="menu" onClick={handleActiveMenu}>
              <MenuTitle title="Clique para mais ações">
                <p>Mais ações</p>
                {active ? <FaAngleUp size={20} /> : <FaAngleDown size={20} />}
              </MenuTitle>
              <SubMenu active={active}>
                <MenuItem
                  title="Clique para adicionar uma nova ordem"
                  onClick={handleNew}
                >
                  <p>Novo</p>
                  <FaFileMedical />
                </MenuItem>
                <MenuItem
                  title="Clique para editar esta ordem"
                  onClick={handleEdit}
                >
                  <p>Editar</p>
                  <FaFileSignature />
                </MenuItem>
                <MenuItem
                  title="Clique para excluir esta ordem"
                  onClick={handleRemove}
                >
                  <p>Excluir</p>
                  <FaFileExcel />
                </MenuItem>
              </SubMenu>
            </Menu>
          )}
        </Action>
      </Header>
      <Main>
        <Card
          color={status(order.status)?.bgColor}
          title={order.status === 'invoiced'
            ? `Esta ordem de serviço foi finalizada há ${formatDistanceToNow(parseISO(order.updated_at), { locale })}`
            : 'Para editar esta ordem vá em Mais ações > Editar'}
          onClick={handleActiveMenu}
          data-id="menu"
        >
          <OrderId>
            <p>Número da ordem de serviço: {`000000${order.id}`.slice(-7)}</p>
          </OrderId>
          <OrderDescription>
            <p>Descrição: {order.description?.replace(/\\n/g, '<br />') || 'Sem descrição'}</p>
          </OrderDescription>
          <OrderRelated>
            <p>Cliente: {order.customer?.name || 'Não atribuído'}</p>
            <p>Responsável: {order.employee?.name || 'Não atribuído'}</p>
          </OrderRelated>
          <OrderDates>
            <div>
              <FaClipboardList size={16} />
              <p>{order.initial_date && format(parseISO(order.initial_date), 'dd/MM/yyyy')}</p>
            </div>
            <div>
              <FaClipboardCheck size={16} />
              <p>{order.final_date && format(parseISO(order.final_date), 'dd/MM/yyyy')}</p>
            </div>
          </OrderDates>
          {order.used_materials && order.used_materials?.length !== 0 && <OrderUsedMaterials>
            <table>
              {order.used_materials?.sort(
                (a, b) => (a.stock_material.name?.toLowerCase() > b.stock_material.name?.toLowerCase() ? 1 : -1)
              ).map(
                ({ id, quantity: qntt, stock_material }) => (
                  stock_material && <tr key={`${id}`}>
                    <td title={stock_material?.name}>{stock_material?.name}</td>
                    <td title={Intl.NumberFormat('pt-BR', options.REAL).format(stock_material?.price)}>
                      {Intl.NumberFormat('pt-BR', options.REAL).format(stock_material?.price)}
                    </td>
                    <td title={qntt}>{qntt}</td>
                    <td title={Intl.NumberFormat('pt-BR', options.REAL).format(qntt * stock_material?.price)}>
                      {Intl.NumberFormat('pt-BR', options.REAL).format(qntt * stock_material?.price)}
                    </td>
                  </tr>
                ))
              }
            </table>
          </OrderUsedMaterials>}
          <OrderPrice>
            <p>
              {Intl.NumberFormat('pt-BR', options.REAL).format(order.total_price)}
            </p>
          </OrderPrice>
        </Card>
      </Main>
    </Container>
  );
};

export default OrderDetail;
