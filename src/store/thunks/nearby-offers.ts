import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { OfferType } from '../../types/common';
import { APIRoute } from '../../const/const';

interface NearbyOffersProps {
	offerId?: string;
}

const fetchNearbyOffers = createAsyncThunk<OfferType[], NearbyOffersProps, {
	extra: AxiosInstance;
}>(
	'offers/nearbyOffers/fetch',
	async ({ offerId }, { extra: api }) => {
		const { data } = await api.get<OfferType[]>(`${APIRoute.Offers}/${offerId}/nearby`);
		return data;
	}
);

export { fetchNearbyOffers };
