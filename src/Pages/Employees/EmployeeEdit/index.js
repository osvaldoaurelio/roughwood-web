import { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';

import NotFound from '../../NotFound';
import EmployeeForm from '../EmployeeForm';
import { LoaderSpinner } from '../../../components';

import { showEmployee, updateEmployee } from '../../../services/employee';

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

const EmployeeEdit = () => {
  const params = useParams();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [employee, setEmployee] = useState({});

  const handleUpdateEmployee = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { name, username, address, phone, id } = employee;
    if (!name || !username) {
      setLoading(false);
      return setError('Preenchimento obrigatório');
    }
    try {
      const { employee } = await updateEmployee(
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
  });

  const handleShowEmployee = async () => {
    setLoading(true);
    setError(null);

    try {
      const { employee } = await showEmployee(params);
      setEmployee(employee);
    } catch ({ response }) {
      setError(response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleShowEmployee();

    return () => setEmployee({});
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
            <GoBack onClick={() => history.push('/employees')} title="Todos os funcionários">
              <FaAngleLeft size={20} />
              Funcionários
            </GoBack>
            <Name>Editar Funcionário: {employee.name}</Name>
          </Title>
          <Action>
            <Cancel onClick={() => history.replace(`/employees/${params.id}`)} title="Clique para cancelar">
              Cancelar
            </Cancel>
            <Button
              type="button"
              onClick={handleUpdateEmployee}
              title="Clique para salvar as alterações deste funcionário"
            >
              Salvar
            </Button>
          </Action>
        </Header>
      )}
      <Main>
        <EmployeeForm
          employee={employee}
          setEmployee={setEmployee}
          updateEmployee={updateEmployee}
          error={error}
          setError={setError}
        />
      </Main>
    </Container>
  );
};

export default EmployeeEdit;
