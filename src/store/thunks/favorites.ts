import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AppRoute } from '../../const';
import { OfferType } from '../../types/common';
import { AppDispatch } from '../../types/state';

const fetchFavoritesOffers = createAsyncThunk<OfferType[], undefined, {
  extra: AxiosInstance;
}>(
  'offers/favorites/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferType[]>(APIRoute.Favorite);
    return data;
  }
);

interface ChangeProps {
  offerId: string;
  status: boolean;
}

const changeFavorite = createAsyncThunk<void, ChangeProps, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'offers/favorites/change',
  async ({ offerId, status }, { dispatch, extra: api }) => {
    const favoritesStatus = Number(status);
    await api.post<OfferType>(`${AppRoute.Favorites}/${offerId}/${favoritesStatus}`).then(() => {
      dispatch(fetchFavoritesOffers());
    });
  }
);

export { changeFavorite, fetchFavoritesOffers };
