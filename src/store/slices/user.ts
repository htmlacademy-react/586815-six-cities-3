import { UserData } from '../../types/user';
import { AuthStatus } from '../../const/const';
import { createSlice } from '@reduxjs/toolkit';
import { checkAuthAction, loginAction, logoutAction } from '../thunks/user';

export interface UserState {
  info: UserData | null;
  authStatus: AuthStatus;
}

const initialState: UserState = {
  info: null,
  authStatus: AuthStatus.Unknown,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(checkAuthAction.fulfilled, (state, action) => {
      state.info = action.payload;
      state.authStatus = action.payload ? AuthStatus.Auth : AuthStatus.NoAuth;
    })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.info = action.payload;
        state.authStatus = AuthStatus.Auth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.info = null;
      });
  }
});

export const userActions = {
  ...userSlice.actions,
  checkAuthAction,
  loginAction,
  logoutAction,
};
