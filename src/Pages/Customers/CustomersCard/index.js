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

const CustomersCard = ({ customers, error }) => {
  const history = useHistory();

  const handleRedirect = useCallback(({ id }) => {
    history.push(`/customers/${id}`);
  });

  return (
    <Main>
      {error ? (
        <>
          <div>Error status: {error.status}</div>
          <div>Error message: {error.data.message || error.statusText}</div>
        </>
        ) : (
          customers.map((customer) => (
            <Card
              color={customer.color}
              onClick={() => handleRedirect(customer)}
              key={`${customer.id}`}
              title={`Conosco há ${formatDistanceToNow(parseISO(customer.created_at), { locale })}`}
            >
              <Header>
                <Avatar color={customer.color}>{customer.initials}</Avatar>
              </Header>
              <Body>
                <Name><p>{customer.name}</p></Name>
                <CPF><p>{customer.cpf}</p></CPF>
                <Address>
                  <FaMapMarkerAlt size={14} />
                  <p>{customer.address || 'Não informado'}</p>
                </Address>
                <Phone>
                  <FaPhone size={14} />
                  <p>{customer.phone || 'Não informado'}</p>
                </Phone>
              </Body>
            </Card>
        ))
      )}
    </Main>
  );
};

export default CustomersCard;
