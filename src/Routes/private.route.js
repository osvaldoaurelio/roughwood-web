import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from '../Pages/Dashboard';

import Customers from '../Pages/Customers';
import CustomerEdit from '../Pages/Customers/CustomerEdit';
import CustomerCreate from '../Pages/Customers/CustomerCreate';
import CustomerDetail from '../Pages/Customers/CustomerDetail';

import Employees from '../Pages/Employees';
import EmployeeEdit from '../Pages/Employees/EmployeeEdit';
import EmployeeCreate from '../Pages/Employees/EmployeeCreate';
import EmployeeDetail from '../Pages/Employees/EmployeeDetail';

import Materials from '../Pages/Materials';
import MaterialEdit from '../Pages/Materials/MaterialEdit';
import MaterialCreate from '../Pages/Materials/MaterialCreate';
import MaterialDetail from '../Pages/Materials/MaterialDetail';

import Orders from '../Pages/Orders';
import OrderEdit from '../Pages/Orders/OrderEdit';
import OrderCreate from '../Pages/Orders/OrderCreate';
import OrderDetail from '../Pages/Orders/OrderDetail';

import NotFound from '../Pages/NotFound';

const PrivateRoutes = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />

    <Route path="/customers/create" exact component={CustomerCreate} />
    <Route path="/customers/:id/edit" component={CustomerEdit} />
    <Route path="/customers/:id" component={CustomerDetail} />
    <Route path="/customers" component={Customers} />

    <Route path="/employees/create" exact component={EmployeeCreate} />
    <Route path="/employees/:id/edit" component={EmployeeEdit} />
    <Route path="/employees/:id" component={EmployeeDetail} />
    <Route path="/employees" component={Employees} />

    <Route path="/materials/create" exact component={MaterialCreate} />
    <Route path="/materials/:id/edit" component={MaterialEdit} />
    <Route path="/materials/:id" component={MaterialDetail} />
    <Route path="/materials" component={Materials} />

    <Route path="/orders/create" exact component={OrderCreate} />
    <Route path="/orders/:id/edit" component={OrderEdit} />
    <Route path="/orders/:id" component={OrderDetail} />
    <Route path="/orders" component={Orders} />

    <Route path={['/signup', '/signin']}>
      <Redirect to="/" />
    </Route>

    <Route path="*" component={NotFound} />
  </Switch>
);

export default PrivateRoutes;
