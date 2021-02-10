import { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';

import NotFound from '../../NotFound';
import CustomerForm from '../CustomerForm';
import { LoaderSpinner } from '../../../components';

import { showCustomer, updateCustomer } from '../../../services/customer';

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

const CustomerEdit = () => {
  const params = useParams();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customer, setCustomer] = useState({});

  const handleUpdateCustomer = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { name, cpf, address, phone, id } = customer;
    if (!name || !cpf) {
      setLoading(false);
      return setError('Preenchimento obrigatório');
    }
    try {
      const { customer } = await updateCustomer(
        { name, cpf, address, phone },
        { id },
      );
      setCustomer(customer);
      setLoading(false);
      history.push(`/customers/${customer.id}`);
    } catch ({ response }) {
      setError(response.data?.error || response?.statusText);
    } finally {
      setLoading(false);
    }
  });

  const handleShowCustomer = async () => {
    setLoading(true);
    setError(null);

    try {
      const { customer } = await showCustomer(params);
      setCustomer(customer);
    } catch ({ response }) {
      setError(response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleShowCustomer();

    return () => setCustomer({});
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
            <GoBack onClick={() => history.push('/customers')} title="Todos os clientes">
              <FaAngleLeft size={20} />
              Clientes
            </GoBack>
            <Name>Editar Cliente: {customer.name}</Name>
          </Title>
          <Action>
            <Cancel onClick={() => history.replace(`/customers/${params.id}`)} title="Clique para cancelar">
              Cancelar
            </Cancel>
            <Button
              type="button"
              onClick={handleUpdateCustomer}
              title="Clique para salvar as alterações deste cliente"
            >
              Salvar
            </Button>
          </Action>
        </Header>
      )}
      <Main>
        <CustomerForm
          customer={customer}
          setCustomer={setCustomer}
          updateCustomer={updateCustomer}
          error={error}
          setError={setError}
        />
      </Main>
    </Container>
  );
};

export default CustomerEdit;
