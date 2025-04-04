import { AuthStatus } from '../const/const';
import { getMockStoreCreator } from '../utils/mocks';
import { renderHook } from '@testing-library/react';
import useAuth from './auth';
import { Provider } from 'react-redux';

describe('Hook: useAuth', (() => {
  const mockStoreCreator = getMockStoreCreator();
  it('should return "true" when user auth state is Auth', () => {
    const store = mockStoreCreator({ user: { authStatus: AuthStatus.Auth, info: null } });

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <Provider store={store} > {children} </Provider>,
    });

    expect(result.current).toBe(true);
  });

  it('should return "false" when user auth state is NoAuth', () => {
    const store = mockStoreCreator({ user: { authStatus: AuthStatus.NoAuth, info: null } });

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <Provider store={store} > {children} </Provider>,
    });

    expect(result.current).toBe(false);
  });
}));

