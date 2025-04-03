import { AuthStatus } from '../../const';
import { userSlice, userActions } from './user';
import { makeFakeUserData } from '../../utils/mocks';

const { checkAuthAction, loginAction, logoutAction } = userActions;

describe('User Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      info: null,
      authStatus: AuthStatus.Auth
    };

    const result = userSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      info: null,
      authStatus: AuthStatus.Unknown
    };

    const result = userSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set user info, update authStatus to "Auth" when checkAuthAction is fulfilled', () => {
    const mockUserInfo = makeFakeUserData();
    const expectedState = {
      info: mockUserInfo,
      authStatus: AuthStatus.Auth,
    };

    const result = userSlice.reducer(undefined, checkAuthAction.fulfilled(
      mockUserInfo, '', undefined
    ));

    expect(result).toEqual(expectedState);
  });

  it('should update authStatus to "NoAuth" when checkAuthAction is rejected', () => {
    const expectedState = {
      info: null,
      authStatus: AuthStatus.NoAuth,
    };

    const result = userSlice.reducer(undefined, checkAuthAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set user info, update authStatus to "Auth" when loginAction is fulfilled', () => {
    const mockUserInfo = makeFakeUserData();
    const mockAuthData = {
      login: 'qwerty@qwerty.qwerty',
      password: 'qwerty123'
    };
    const initialState = {
      info: null,
      authStatus: AuthStatus.NoAuth,
    };
    const expectedState = {
      info: mockUserInfo,
      authStatus: AuthStatus.Auth,
    };

    const result = userSlice.reducer(initialState, loginAction.fulfilled(
      mockUserInfo, '', mockAuthData
    ));

    expect(result).toEqual(expectedState);
  });

  it('should drop user info, update authStatus to "NoAuth" when logoutAction is fulfilled', () => {
    const mockUserInfo = makeFakeUserData();
    const initialState = {
      info: mockUserInfo,
      authStatus: AuthStatus.Auth,
    };
    const expectedState = {
      info: null,
      authStatus: AuthStatus.NoAuth,
    };

    const result = userSlice.reducer(initialState, logoutAction.fulfilled);

    expect(result).toEqual(expectedState);
  });
});
