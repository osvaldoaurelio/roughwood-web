import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaRegAddressCard, FaUserEdit } from 'react-icons/fa';

import { LoaderSpinner } from '../../../components';

import {
  Avatar,
  Button,
  Body,
  Container,
  ErrorContainer,
  NoInputError,
  Form,
  Header,
  Name,
  CPF,
  Address,
  Phone,
  Input
} from './styles';

const CustomerEdit = ({ customer, setCustomer, ...props}) => {
  const history = useHistory();
  const { pathname } = useLocation();

  const [initialState, setInitialState] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    props.setError(null);

    const [fnName] = Object.keys(props);
    const fn = props[fnName];

    const { name, cpf, address, phone, id } = customer;
    if (!name || !cpf) {
      setLoading(false);
      return setError('Preenchimento obrigatório');
    }
    try {
      const { customer } = await fn(
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
  };

  const handleInputChange = useCallback(
    ({ target }) => {
      const { name, value } = target;

      setError(null);
      props.setError(null);

      setCustomer({ ...customer, [name]: value });
    }
  );

  useEffect(() => {
    const { name = '' } = customer;
    setInitialState(name
      .split(' ')
      .splice(0, 2)
      .map(([name]) => name)
      .join('')
      .toUpperCase());
  }, [customer?.name]);

  return (
    <Container>
      {loading ? (
        <LoaderSpinner size={300} />
      ) : (
        <Form color={customer?.color} onSubmit={handleFormSubmit}>
          <Header>
            <Avatar color={customer?.color}>
              {initialState || customer?.initials}
            </Avatar>
            <Button type="submit" title="Esse filho da puta tá aki pq nao consegui fazer sem ele" />
          </Header>
          <Body>
            <ErrorContainer>
              <NoInputError error={props.error || error}>{props.error || error}</NoInputError>
            </ErrorContainer>
            <Name>
              <FaUserEdit size={20} />
              <Input
                autoFocus={true}
                onChange={handleInputChange}
                value={customer?.name}
                error={props.error || error}
                name="name"
                placeholder="Nome"
                title="Digite o nome do cliente"
              />
            </Name>
            <CPF>
              <FaRegAddressCard size={20} />
              <Input
                onChange={handleInputChange}
                value={customer?.cpf}
                error={error || props.error}
                name="cpf"
                placeholder="CPF"
                disabled={pathname.includes('edit')}
                title={pathname.includes('edit')
                  ? 'Não pode ser alterado'
                  : 'Digite o cpf do cliente'}
              />
            </CPF>
            <Address>
              <FaMapMarkerAlt size={20} />
              <Input
                onChange={handleInputChange}
                value={customer?.address}
                name="address"
                placeholder="Endereço"
                title="Digite o endereço do cliente"
              />
            </Address>
            <Phone>
              <FaPhone size={20} />
              <Input
                onChange={handleInputChange}
                value={customer?.phone}
                name="phone"
                placeholder="Telefone"
                title="Digite o telefone do cliente"
              />
            </Phone>
          </Body>
        </Form>
      )}
    </Container>
  );
};

export default CustomerEdit;
