import OrdersCard from '../../Orders/OrdersCard';

import { Container } from './styles';

const CustomerOrders = ({ customer_orders }) => (
  <Container>
    <OrdersCard orders={customer_orders} />
  </Container>
);

export default CustomerOrders;
