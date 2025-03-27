import { useAppSelector } from './store';
import { AuthStatus } from '../const';
import { useMemo } from 'react';
import { getAuthStatus } from '../store/selectors/user';

function useAuth(): boolean {
  const authStatus = useAppSelector(getAuthStatus);

  return useMemo(() => authStatus === AuthStatus.Auth, [authStatus]);
}

export default useAuth;
