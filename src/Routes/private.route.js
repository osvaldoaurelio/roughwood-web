import { Switch, Route, Redirect } from "react-router-dom";

import Dashboard from "../Pages/Dashboard";
import User from "../Pages/User";
import NotFound from "../Pages/NotFound";

const PrivateRoutes = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/user" component={User} />
    <Route path="/customers" component={User} />
    <Route path={["/signup", "/signin"]}>
      <Redirect to="/"/>
    </Route>
    <Route path="*" component={NotFound} />
  </Switch>
);

export default PrivateRoutes;
