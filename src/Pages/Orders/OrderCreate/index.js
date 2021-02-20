import { useState } from 'react';
import { parseISO } from 'date-fns';
import { FaAngleLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

import OrderForm from '../OrderForm';

import { storeOrder } from '../../../services/order';

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

import { LoaderSpinner } from '../../../components';

const OrderCreate = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState({
    customer_id: history.location.state?.id,
    customer_name: history.location.state?.name,
  });

  const handleStoreOrder = async () => {
    setLoading(true);
    setError(null);

    const {
      user_id,
      customer_id,
      description,
      initial_date,
      final_date,
      labor_cost,
      total_price,
      used_materials = [],
    } = order;
    if (!customer_id || !initial_date || !final_date || !labor_cost || !total_price) {
      setLoading(false);
      return setError('Preenchimento obrigatório');
    }
    if(final_date < initial_date) {
      setLoading(false);
      return setError('Data final não pode ser anterior à data inicial');
    }
    try {
      const { order } = await storeOrder({
        user_id,
        customer_id,
        description,
        initial_date: parseISO(initial_date),
        final_date: parseISO(final_date),
        labor_cost,
        total_price,
        used_materials,
      });
      setOrder(order);
      setLoading(false);
      history.push(`/orders/${order.id}`);
    } catch ({ response }) {
      setError(response.data?.error || response?.statusText);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <Title>
          <GoBack onClick={() => history.push('/orders')} title="Todas as ordens">
            <FaAngleLeft size={20} />
            Ordens
          </GoBack>
          <Name>Nova ordem</Name>
        </Title>
        <Action>
          <Cancel onClick={() => history.replace('/orders')} title="Clique para cancelar">
            Cancelar
          </Cancel>
          <Button
            type="button"
            onClick={handleStoreOrder}
            title="Clique para criar uma nova ordem"
          >
            Salvar
          </Button>
        </Action>
      </Header>
      <Main>
        {loading ? (
          <LoaderSpinner size={300} />
        ) : (
          <OrderForm
            order={order}
            setOrder={setOrder}
            storeOrder={storeOrder}
            error={error}
            setError={setError}
          />
        )}
      </Main>
    </Container>
  );
};

export default OrderCreate;
