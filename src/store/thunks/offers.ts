import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { OfferType } from '../../types/common';
import { APIRoute } from '../../const';

const fetchOffers = createAsyncThunk<OfferType[], undefined, {
  extra: AxiosInstance;
}>(
  'offers/all/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferType[]>(APIRoute.Offers);
    return data;
  }
);

export { fetchOffers };
