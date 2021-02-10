import OrdersCard from '../../Orders/OrdersCard';

import { Container } from './styles';

const EmployeeOrders = ({ employee_orders }) => (
  <Container>
    <OrdersCard orders={employee_orders} />
  </Container>
);

export default EmployeeOrders;
