import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { OfferType, DetailedOfferType, ReviewType } from '../types/common';
import { requireAuthorization, loadOffers, setError, setOffersLoadingStatus, addUserData, loadDetailedOffer, loadOfferReviews, loadNearbyOffers } from './action';
import { AuthorizationStatus, APIRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { saveToken, dropToken } from '../services/token';
import { UserData, AuthData } from '../types/user';
import { store } from '.';

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(() => {
      store.dispatch(setError(null));
    }, TIMEOUT_SHOW_ERROR);
  }
);

export const fetchOffers = createAsyncThunk<void, undefined, {
  state: State;
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'fetchOffers', async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(true));
    const { data } = await api.get<OfferType[]>(APIRoute.Offers);
    dispatch(setOffersLoadingStatus(false));
    dispatch(loadOffers(data));
  }
);

export const fetchDetailedOffer = createAsyncThunk<void, string | undefined, {
  state: State;
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'fetchDetailedOffer', async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<DetailedOfferType>(`${APIRoute.Offers}/${_arg}`);
    dispatch(loadDetailedOffer(data));
  }
);

export const fetchOfferReviews = createAsyncThunk<void, string | undefined, {
  state: State;
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'fetchOfferReviews', async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<ReviewType[]>(`${APIRoute.Comments}/${_arg}`);
    dispatch(loadOfferReviews(data));
  }
);

export const fetchNearbyOffers = createAsyncThunk<void, string | undefined, {
  state: State;
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'fetchNearbyOffers', async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<OfferType[]>(`${APIRoute.Offers}/${_arg}/nearby`);
    dispatch(loadNearbyOffers(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(addUserData(data));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(addUserData(data));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(addUserData(null));
  },
);
