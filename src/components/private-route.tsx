import { AppRoute } from '../const';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/auth';
import Loader from '../loader';
import { useAppSelector } from '../hooks/store';
import { AuthStatus } from '../const';

type PrivateRouteProps = {
  children: JSX.Element;
  reverse?: boolean;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { children, reverse } = props;
  const isAuth = useAuth();
  const authStatus = useAppSelector((state) => state.user.authStatus);

  if (authStatus === AuthStatus.Unknown) {
    return <Loader />;
  }

  if (reverse && isAuth) {
    return <Navigate to={AppRoute.Main} replace />;
  }

  if (!reverse && !isAuth) {
    return <Navigate to={AppRoute.Login} replace />;
  }

  return children;
}

export default PrivateRoute;
