import { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';

import NotFound from '../../NotFound';
import OrderForm from '../OrderForm';
import { LoaderSpinner } from '../../../components';

import { showOrder, updateOrder } from '../../../services/order';

import {
  Container,
  Header,
  Title,
  GoBack,
  Name,
  Action,
  Cancel,
  Button,
  Main,
} from './styles';

const OrderEdit = () => {
  const params = useParams();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState({});

  const handleUpdateOrder = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { id, user_id, description } = order;

    try {
      const { order } = await updateOrder(
        { user_id, description },
        { id },
      );
      setOrder(order);
      setLoading(false);
      history.push(`/orders/${id}`);
    } catch ({ response }) {
      setError(response.data?.error || response?.statusText);
    } finally {
      setLoading(false);
    }
  });

  const handleShowOrder = async () => {
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
  };

  useEffect(() => {
    handleShowOrder();

    return () => setOrder({});
  }, []);

  if (error?.status === 404) {
    return <NotFound />;
  }

  return (
    <Container>
      {loading ? (
        <LoaderSpinner size={300} />
      ) : (
        <Header>
          <Title>
            <GoBack onClick={() => history.push('/orders')} title="Todas as ordens">
              <FaAngleLeft size={20} />
              Ordens
            </GoBack>
            <Name>Editar Ordem: {order.name}</Name>
          </Title>
          <Action>
            <Cancel onClick={() => history.replace(`/orders/${params.id}`)} title="Clique para cancelar">
              Cancelar
            </Cancel>
            <Button
              type="button"
              onClick={handleUpdateOrder}
              title="Clique para salvar as alterações desta ordem"
            >
              Salvar
            </Button>
          </Action>
        </Header>
      )}
      <Main>
        <OrderForm
          order={order}
          setOrder={setOrder}
          updateOrder={updateOrder}
          error={error}
          setError={setError}
        />
      </Main>
    </Container>
  );
};

export default OrderEdit;
