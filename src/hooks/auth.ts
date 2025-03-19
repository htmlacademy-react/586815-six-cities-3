import { useAppSelector } from './store';
import { AuthStatus } from '../const';

function useAuth(): boolean {
  const authStatus = useAppSelector((state) => state.user.authStatus);

  return authStatus === AuthStatus.Auth;
}

export default useAuth;
