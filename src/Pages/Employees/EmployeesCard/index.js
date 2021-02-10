import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ptBR as locale } from 'date-fns/locale';

import {
  Main,
  Card,
  Header,
  Avatar,
  Body,
  Name,
  CPF,
  Address,
  Phone,
} from './styles';

const EmployeesCard = ({ employees, error }) => {
  const history = useHistory();

  const handleRedirect = useCallback(({ id }) => {
    history.push(`/employees/${id}`);
  });

  return (
    <Main>
      {error ? (
        <>
          <div>Error status: {error.status}</div>
          <div>Error message: {error.data.message || error.statusText}</div>
        </>
        ) : (
          employees.map((employee) => (
            <Card
              color={employee.color}
              onClick={() => handleRedirect(employee)}
              key={`${employee.id}`}
              title={`Conosco há ${formatDistanceToNow(parseISO(employee.created_at), { locale })}`}
            >
              <Header>
                <Avatar color={employee.color}>{employee.initials}</Avatar>
              </Header>
              <Body>
                <Name><p>{employee.name}</p></Name>
                <CPF><p>{employee.username}</p></CPF>
                <Address>
                  <FaMapMarkerAlt size={14} />
                  <p>{employee.address || 'Não informado'}</p>
                </Address>
                <Phone>
                  <FaPhone size={14} />
                  <p>{employee.phone || 'Não informado'}</p>
                </Phone>
              </Body>
            </Card>
        ))
      )}
    </Main>
  );
};

export default EmployeesCard;
