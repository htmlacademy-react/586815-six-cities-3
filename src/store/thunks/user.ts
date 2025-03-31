import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { UserData } from '../../types/user';
import { saveToken, dropToken } from '../../services/token';

const checkAuthAction = createAsyncThunk<UserData | null, undefined, {
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const response = await api.get<UserData>(APIRoute.Login);

    return response ? response.data : null;
  },
);

interface AuthData {
  login: string;
  password: string;
}

const loginAction = createAsyncThunk<UserData, AuthData, {
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    return data;
  },
);

const logoutAction = createAsyncThunk<void, undefined, {
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export { checkAuthAction, loginAction, logoutAction };
