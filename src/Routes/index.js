import useAuth from "../hooks/useAuth";
import LoaderSpinner from "../components/LoaderSpinner";

import PublicRoutes from "./public.route";
import PrivateRoutes from "./private.route";

const Routes = () => {
  const { isUserSignedIn, loading } = useAuth();

  if (loading) {
    return <LoaderSpinner size={300} />;
  }

  return isUserSignedIn ? <PrivateRoutes /> : <PublicRoutes />;
};

export default Routes;
