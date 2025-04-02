import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../../const';
import { DetailedOfferType, OfferType } from '../../types/common';

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

const changeFavorite = createAsyncThunk<DetailedOfferType, ChangeProps, {
  extra: AxiosInstance;
}>(
  'offers/favorites/change',
  async ({ offerId, status }, { extra: api }) => {
    const favoritesStatus = Number(status);
    const { data } = await api.post<DetailedOfferType>(`${APIRoute.Favorite}/${offerId}/${favoritesStatus}`);
    return data;
  }
);

export { changeFavorite, fetchFavoritesOffers };
