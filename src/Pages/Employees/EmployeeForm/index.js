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
  UserName,
  Address,
  Phone,
  Input
} from './styles';

const EmployeeEdit = ({ employee, setEmployee, ...props}) => {
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

    const { name, username, address, phone, id } = employee;
    if (!name || !username) {
      setLoading(false);
      return setError('Preenchimento obrigatório');
    }
    try {
      const { employee } = await fn(
        { name, username, address, phone },
        { id },
        );
        setEmployee(employee);
        setLoading(false);
        history.push(`/employees/${employee.id}`);
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

      setEmployee({ ...employee, [name]: value });
    }
  );

  useEffect(() => {
    const { name = '' } = employee;
    setInitialState(name
      .split(' ')
      .splice(0, 2)
      .map(([name]) => name)
      .join('')
      .toUpperCase());
  }, [employee?.name]);

  return (
    <Container>
      {loading ? (
        <LoaderSpinner size={300} />
      ) : (
        <Form color={employee?.color} onSubmit={handleFormSubmit}>
          <Header>
            <Avatar color={employee?.color}>
              {initialState || employee?.initials}
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
                value={employee?.name}
                error={props.error || error}
                name="name"
                placeholder="Nome"
                title="Digite o nome do funcionário"
              />
            </Name>
            <UserName>
              <FaRegAddressCard size={20} />
              <Input
                onChange={handleInputChange}
                value={employee?.username}
                error={error || props.error}
                name="username"
                placeholder="UserName"
                disabled={pathname.includes('edit')}
                title={pathname.includes('edit')
                  ? 'Não pode ser alterado'
                  : 'Digite o username do funcionário'}
              />
            </UserName>
            <Address>
              <FaMapMarkerAlt size={20} />
              <Input
                onChange={handleInputChange}
                value={employee?.address}
                name="address"
                placeholder="Endereço"
                title="Digite o endereço do funcionário"
              />
            </Address>
            <Phone>
              <FaPhone size={20} />
              <Input
                onChange={handleInputChange}
                value={employee?.phone}
                name="phone"
                placeholder="Telefone"
                title="Digite o telefone do funcionário"
              />
            </Phone>
          </Body>
        </Form>
      )}
    </Container>
  );
};

export default EmployeeEdit;
