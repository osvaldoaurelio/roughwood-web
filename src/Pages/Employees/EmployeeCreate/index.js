import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';

import EmployeeForm from '../EmployeeForm';

import { storeEmployee } from '../../../services/employee';

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

const EmployeeCreate = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [employee, setEmployee] = useState({});

  const handleStoreEmployee = async () => {
    setLoading(true);
    setError(null);

    const { name, username, address, phone } = employee;
    if (!name || !username) {
      setLoading(false);
      return setError('Preenchimento obrigatório');
    }
    try {
      const { employee } = await storeEmployee(
        { name, username, address, phone },
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

  return (
    <Container>
      <Header>
        <Title>
          <GoBack onClick={() => history.push('/employees')} title="Todos os funcionários">
            <FaAngleLeft size={20} />
            Funcionários
          </GoBack>
          <Name>Novo Funcionário</Name>
        </Title>
        <Action>
          <Cancel onClick={() => history.replace('/employees')} title="Clique para cancelar">
            Cancelar
          </Cancel>
          <Button
            type="button"
            onClick={handleStoreEmployee}
            title="Clique para criar um novo funcionário"
          >
            Salvar
          </Button>
        </Action>
      </Header>
      <Main>
        {loading ? (
          <LoaderSpinner size={300} />
        ) : (
          <EmployeeForm
            employee={employee}
            setEmployee={setEmployee}
            storeEmployee={storeEmployee}
            error={error}
            setError={setError}
          />
        )}
      </Main>
    </Container>
  );
};

export default EmployeeCreate;
