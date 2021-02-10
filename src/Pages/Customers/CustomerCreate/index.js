import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';

import CustomerForm from '../CustomerForm';

import { storeCustomer } from '../../../services/customer';

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

const CustomerCreate = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customer, setCustomer] = useState({});

  const handleStoreCustomer = async () => {
    setLoading(true);
    setError(null);

    const { name, cpf, address, phone } = customer;
    if (!name || !cpf) {
      setLoading(false);
      return setError('Preenchimento obrigatório');
    }
    try {
      const { customer } = await storeCustomer(
        { name, cpf, address, phone },
      );
      setCustomer(customer);
      setLoading(false);
      history.push(`/customers/${customer.id}`);
    } catch ({ response }) {
      setError(response.statusText);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <Title>
          <GoBack onClick={() => history.push('/customers')} title="Todos os clientes">
            <FaAngleLeft size={20} />
            Clientes
          </GoBack>
          <Name>Novo Cliente</Name>
        </Title>
        <Action>
          <Cancel onClick={() => history.replace('/customers')} title="Clique para cancelar">
            Cancelar
          </Cancel>
          <Button
            type="button"
            onClick={handleStoreCustomer}
            title="Clique para criar um novo cliente"
          >
            Salvar
          </Button>
        </Action>
      </Header>
      <Main>
        {loading ? (
          <LoaderSpinner size={300} />
        ) : (
          <CustomerForm
            customer={customer}
            setCustomer={setCustomer}
            storeCustomer={storeCustomer}
            error={error}
            setError={setError}
          />
        )}
      </Main>
    </Container>
  );
};

export default CustomerCreate;
