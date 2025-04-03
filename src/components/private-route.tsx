import { AppRoute } from '../const';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/auth';

type PrivateRouteProps = {
  children: JSX.Element;
  reverse?: boolean;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { children, reverse } = props;
  const isAuth = useAuth();

  if (reverse && isAuth) {
    return <Navigate to={AppRoute.Main} replace />;
  }

  if (!reverse && !isAuth) {
    return <Navigate to={AppRoute.Login} replace />;
  }

  return children;
}

export default PrivateRoute;
