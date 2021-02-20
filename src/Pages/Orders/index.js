import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaSearch, FaRegTimesCircle } from 'react-icons/fa';

import OrdersCard from './OrdersCard';
import { LoaderSpinner } from '../../components';

import { useAuth } from '../../hooks';
import { listOrders } from '../../services/order';

import { Container, Header, Title, Action, Input, Button, NoOrdersFound, Body } from './styles';

const Orders = () => {
  const history = useHistory();
  const { signOut } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleListOrders = useCallback(
    async term => {
      setLoading(true);
      setError(null);

      try {
        const { orders } = await listOrders(term);
        setOrders(orders);
      } catch ({ response }) {
        response.data?.error === 'Invalid JWT token' && signOut();
        setError(response);
      } finally {
        setLoading(false);
      }
    }
  );

  useEffect(() => {
    if (!searchTerm) setLoading(true);

    const delayDebounceFn = setTimeout(() => {
      handleListOrders(searchTerm);
    }, 1000);

    return () => { clearTimeout(delayDebounceFn); };
  }, [searchTerm]);

  const handleSearchTerm = useCallback(({ target }) => {
    setSearchTerm(previous => {
      return previous === searchTerm ? target.value: previous;
    });
  });

  return (
    <Container>
      <Header>
        <Title>Ordens</Title>
        <Action>
          <FaSearch size={20} />
          <Input
            type="text"
            placeholder="Buscar ordem"
            title="Clique para pesquisar ordens por descrição, cliente ou funcionário"
            value={searchTerm}
            onChange={handleSearchTerm}
          />
          {searchTerm && <FaRegTimesCircle onClick={() => setSearchTerm('')} size={20} title="Limpar" />}
          <Button
            onClick={() => history.push('/orders/create')}
            title="Clique para cadastrar uma nova ordem"
            type="button"
          >
            Nova Ordem
          </Button>
        </Action>
      </Header>
      <Body>
        {loading ? (
          <LoaderSpinner size={300} />
        ) : (
          orders.length !== 0 ? (
            <OrdersCard orders={orders} error={error} />
          ) : (
            <NoOrdersFound>
              Nenhuma ordem encontrada.
              {searchTerm
                ? ' Mude o termo de busca ou limpe o campo para uma nova pequisa.'
                : ' Para cadastrar uma ordem clique no botão Nova Ordem.'}
            </NoOrdersFound>
          )
        )}
      </Body>
    </Container>
  );
};

export default Orders;
