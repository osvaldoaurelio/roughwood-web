import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { FaClipboardList, FaClipboardCheck } from 'react-icons/fa';

import { status, options } from '../../../utils';

import {
  Main,
  Card,
  Body,
  OrderId,
  OrderRelated,
  OrderDescription,
  OrderDates,
  OrderPrice,
  OrderFooter,
} from './styles';

const OrdersCard = ({ orders }) => {
  const history = useHistory();

  const handleRedirect = useCallback(({ id }) => {
    history.push(`/orders/${id}`);
  });

  return (
    <Main>
      {orders?.map(order => (
        <Card
          color={status(order.status).bgColor}
          onClick={() => handleRedirect(order)}
          key={`${order.id}`}
          title="Clique para mais detalhes"
        >
          <Body>
            <OrderId>
              <p>{`000000${order.id}`.slice(-7)}</p>
            </OrderId>
            <OrderRelated>
              <p>{order.customer?.name || 'Não atribuído'}</p>
              <p>{order.employee?.name || 'Não atribuído'}</p>
            </OrderRelated>
            <OrderDescription>
              <p>{order.description?.replace(/\\n/g, '<br />') || 'Sem descrição'}</p>
            </OrderDescription>
            <OrderDates>
              <div>
                <FaClipboardList size={16} />
                <p>{format(parseISO(order.initial_date), 'dd/MM/yyyy')}</p>
              </div>
              <div>
                <FaClipboardCheck size={16} />
                <p>{format(parseISO(order.final_date), 'dd/MM/yyyy')}</p>
              </div>
            </OrderDates>
            <OrderPrice>
              <p>
                {Intl.NumberFormat('pt-BR', options.REAL).format(order.total_price)}
              </p>
            </OrderPrice>
            <OrderFooter
              color={status(order.status).color}
              bgColor={status(order.status).bgColor}
            >
              <p>{status(order.status).text}</p>
            </OrderFooter>
          </Body>
        </Card>)
      )}
    </Main>
  );
};

export default OrdersCard;
