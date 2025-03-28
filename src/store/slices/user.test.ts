import { RequestStatus, AuthStatus } from '../../const';
import { userSlice, userActions } from './user';
import { makeFakeUserData } from '../../utils/mocks';

const { checkAuthAction, loginAction, logoutAction } = userActions;

describe('User Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      info: null,
      authStatus: AuthStatus.Auth,
      status: RequestStatus.Succeeded,
    };

    const result = userSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      info: null,
      authStatus: AuthStatus.Unknown,
      status: RequestStatus.Idle
    };

    const result = userSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should mark status as "loading" when checkAuthAction is pending', () => {
    const expectedState = {
      info: null,
      authStatus: AuthStatus.Unknown,
      status: RequestStatus.Loading,
    };

    const result = userSlice.reducer(undefined, checkAuthAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set user info, update authStatus to "Auth", mark status as "succeeded" when checkAuthAction is fulfilled', () => {
    const mockUserInfo = makeFakeUserData();
    const expectedState = {
      info: mockUserInfo,
      authStatus: AuthStatus.Auth,
      status: RequestStatus.Succeeded,
    };

    const result = userSlice.reducer(undefined, checkAuthAction.fulfilled(
      mockUserInfo, '', undefined
    ));

    expect(result).toEqual(expectedState);
  });

  it('should update authStatus to "NoAuth", mark status as "failed" when checkAuthAction is rejected', () => {
    const expectedState = {
      info: null,
      authStatus: AuthStatus.NoAuth,
      status: RequestStatus.Failed,
    };

    const result = userSlice.reducer(undefined, checkAuthAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should mark status as "loading" when loginAction is pending', () => {
    const initialState = {
      info: null,
      authStatus: AuthStatus.NoAuth,
      status: RequestStatus.Idle,
    };
    const expectedState = {
      info: null,
      authStatus: AuthStatus.NoAuth,
      status: RequestStatus.Loading,
    };

    const result = userSlice.reducer(initialState, loginAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set user info, update authStatus to "Auth", mark status as "succeeded" when loginAction is fulfilled', () => {
    const mockUserInfo = makeFakeUserData();
    const mockAuthData = {
      login: 'qwerty@qwerty.qwerty',
      password: 'qwerty123'
    };
    const initialState = {
      info: null,
      authStatus: AuthStatus.NoAuth,
      status: RequestStatus.Loading,
    };
    const expectedState = {
      info: mockUserInfo,
      authStatus: AuthStatus.Auth,
      status: RequestStatus.Succeeded,
    };

    const result = userSlice.reducer(initialState, loginAction.fulfilled(
      mockUserInfo, '', mockAuthData
    ));

    expect(result).toEqual(expectedState);
  });

  it('should mark status as "failed" when loginAction is rejected', () => {
    const initialState = {
      info: null,
      authStatus: AuthStatus.NoAuth,
      status: RequestStatus.Loading,
    };
    const expectedState = {
      info: null,
      authStatus: AuthStatus.NoAuth,
      status: RequestStatus.Failed,
    };

    const result = userSlice.reducer(initialState, loginAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should mark status as "loading" when logoutAction  is pending', () => {
    const initialState = {
      info: null,
      authStatus: AuthStatus.Auth,
      status: RequestStatus.Idle,
    };
    const expectedState = {
      info: null,
      authStatus: AuthStatus.Auth,
      status: RequestStatus.Loading,
    };

    const result = userSlice.reducer(initialState, logoutAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should drop user info, update authStatus to "NoAuth", mark status as "succeeded" when logoutAction is fulfilled', () => {
    const mockUserInfo = makeFakeUserData();
    const initialState = {
      info: mockUserInfo,
      authStatus: AuthStatus.Auth,
      status: RequestStatus.Loading,
    };
    const expectedState = {
      info: null,
      authStatus: AuthStatus.NoAuth,
      status: RequestStatus.Succeeded,
    };

    const result = userSlice.reducer(initialState, logoutAction.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('should mark status as "failed" when logoutAction is rejected', () => {
    const mockUserInfo = makeFakeUserData();
    const initialState = {
      info: mockUserInfo,
      authStatus: AuthStatus.Auth,
      status: RequestStatus.Loading,
    };
    const expectedState = {
      info: mockUserInfo,
      authStatus: AuthStatus.Auth,
      status: RequestStatus.Failed,
    };

    const result = userSlice.reducer(initialState, logoutAction.rejected);

    expect(result).toEqual(expectedState);
  });
});
