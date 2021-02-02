import useAuth from "../hooks/useAuth";
import LoaderSpinner from "../components/LoaderSpinner";

import PublicRoutes from "./public.route";
import PrivateRoutes from "./private.route";

const Routes = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return <LoaderSpinner size={300} />;
  }

  return signed ? <PrivateRoutes /> : <PublicRoutes />;
};

export default Routes;
