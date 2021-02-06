import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from '../Pages/Dashboard';
import Customers from '../Pages/Customers';
import NotFound from '../Pages/NotFound';

const PrivateRoutes = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/customers" component={Customers} />

    <Route path={['/signup', '/signin']}>
      <Redirect to="/" />
    </Route>
    <Route path="*" component={NotFound} />
  </Switch>
);

export default PrivateRoutes;
