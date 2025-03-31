import { UserData } from '../../types/user';
import { RequestStatus } from '../../const';
import { AuthStatus } from '../../const';
import { createSlice } from '@reduxjs/toolkit';
import { checkAuthAction, loginAction, logoutAction } from '../thunks/user';

export interface UserState {
  info: UserData | null;
  authStatus: AuthStatus;
  status: RequestStatus;
}

const initialState: UserState = {
  info: null,
  authStatus: AuthStatus.Unknown,
  status: RequestStatus.Idle
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(checkAuthAction.pending, (state) => {
      state.status = RequestStatus.Loading;
    })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.info = action.payload;
        state.authStatus = action.payload ? AuthStatus.Auth : AuthStatus.NoAuth;
        state.status = RequestStatus.Succeeded;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.status = RequestStatus.Failed;
      })
      .addCase(loginAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.info = action.payload;
        state.authStatus = AuthStatus.Auth;
        state.status = RequestStatus.Succeeded;
      })
      .addCase(loginAction.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(logoutAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.info = null;
        state.status = RequestStatus.Succeeded;
      })
      .addCase(logoutAction.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const userActions = {
  ...userSlice.actions,
  checkAuthAction,
  loginAction,
  logoutAction,
};
