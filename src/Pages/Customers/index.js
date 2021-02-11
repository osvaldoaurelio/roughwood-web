import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { FaRegTimesCircle } from 'react-icons/fa';

import CustomersCard from './CustomersCard';
import { LoaderSpinner } from '../../components';

import { useAuth } from '../../hooks';
import { listCustomers } from '../../services/customer';

import { Container, Header, Title, Action, Input, Button, NoCustomersFound, Body } from './styles';

const Customers = () => {
  const history = useHistory();
  const { signOut } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleListCustomers = useCallback(
    async term => {
      setLoading(true);
      setError(null);

      try {
        const { customers } = await listCustomers(term);
        setCustomers(customers);
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
      handleListCustomers(searchTerm);
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
        <Title>Clientes</Title>
        <Action>
          <FaSearch size={20} />
          <Input
            type="text"
            placeholder="Buscar clientes"
            title="Clique para pesquisar clientes"
            value={searchTerm}
            onChange={handleSearchTerm}
          />
          {searchTerm && <FaRegTimesCircle onClick={() => setSearchTerm('')} size={20} title="Limpar" />}
          <Button
            onClick={() => history.push('/customers/create')}
            title="Clique para cadastrar um novo cliente"
            type="button"
          >
            Novo Cliente
          </Button>
        </Action>
      </Header>
      <Body>
        {loading ? (
          <LoaderSpinner size={300} />
        ) : (
          customers.length !== 0 ? (
            <CustomersCard customers={customers} error={error} />
          ) : (
            <NoCustomersFound>
              Nenhum cliente encontrado.
              {searchTerm
                ? ' Mude o termo de busca ou limpe o campo para uma nova pequisa.'
                : ' Para cadastrar um cliente clique no botão Novo Cliente.'}
            </NoCustomersFound>
          )
        )}
      </Body>
    </Container>
  );
};

export default Customers;
