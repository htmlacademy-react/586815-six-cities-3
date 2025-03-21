import { AppRoute } from '../const';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/auth';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { children } = props;
  const isAuth = useAuth();
  return (
    isAuth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
