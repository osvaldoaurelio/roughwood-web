import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { FaRegTimesCircle } from 'react-icons/fa';

import EmployeesCard from './EmployeesCard';
import { LoaderSpinner } from '../../components';

import { listEmployees } from '../../services/employee';

import { Container, Header, Title, Action, Input, Button, NoEmployeesFound, Body } from './styles';

const Employees = () => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleListEmployees = useCallback(
    async term => {
      setLoading(true);
      setError(null);

      try {
        const { employees } = await listEmployees(term);
        setEmployees(employees);
      } catch ({ response }) {
        setError(response);
      } finally {
        setLoading(false);
      }
    }
  );

  useEffect(() => {
    if (!searchTerm) setLoading(true);

    const delayDebounceFn = setTimeout(() => {
      handleListEmployees(searchTerm);
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
        <Title>Funcionários</Title>
        <Action>
          <FaSearch size={20} />
          <Input
            type="text"
            placeholder="Buscar funcionários"
            title="Clique para pesquisar funcionários"
            value={searchTerm}
            onChange={handleSearchTerm}
          />
          {searchTerm && <FaRegTimesCircle onClick={() => setSearchTerm('')} size={20} title="Limpar" />}
          <Button
            onClick={() => history.push('/employees/create')}
            title="Clique para cadastrar um novo funcionário"
            type="button"
          >
            Novo Funcionário
          </Button>
        </Action>
      </Header>
      <Body>
        {loading ? (
          <LoaderSpinner size={300} />
        ) : (
          employees.length !== 0 ? (
            <EmployeesCard employees={employees} error={error} />
          ) : (
            <NoEmployeesFound>
              Nenhum funcionário encontrado.
              {searchTerm
                ? ' Mude o termo de busca ou limpe o campo para uma nova pequisa.'
                : ' Para cadastrar um funcionário clique no botão Novo Funcionário.'}
            </NoEmployeesFound>
          )
        )}
      </Body>
    </Container>
  );
};

export default Employees;
