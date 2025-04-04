import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../../const/const';
import { DetailedOfferType } from '../../types/common';

interface OfferProps {
	offerId?: string;
}

const fetchDetailedOffer = createAsyncThunk<DetailedOfferType, OfferProps, {
	extra: AxiosInstance;
}>(
	'offers/one/fetch',
	async ({ offerId }, { extra: api }) => {
		const { data } = await api.get<DetailedOfferType>(`${APIRoute.Offers}/${offerId}`);
		return data;
	}
);

export { fetchDetailedOffer };
