import { useAppSelector } from './store';
import { AuthStatus } from '../const';
import { useMemo } from 'react';

function useAuth(): boolean {
  const authStatus = useAppSelector((state) => state.user.authStatus);

  return useMemo(() => authStatus === AuthStatus.Auth, [authStatus]);
}

export default useAuth;
