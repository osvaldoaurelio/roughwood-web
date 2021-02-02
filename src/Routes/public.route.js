import { Switch, Route, Redirect } from "react-router-dom";

import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";

const PublicRoutes = () => (
  <Switch>
    <Route path="/signup" component={SignUp} />
    <Route path="/signin" component={SignIn} />
    <Route path="*">
      <Redirect to="/signin" />
    </Route>
  </Switch>
);

export default PublicRoutes;
