import { AuthorizationStatus, AppRoute } from '../const';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
  isReverse?: boolean;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children, isReverse} = props;
  return (
    authorizationStatus === AuthorizationStatus.NoAuth
      ? children
      : <Navigate to={isReverse ? AppRoute.Main : AppRoute.Login } />
  );
}

export default PrivateRoute;
