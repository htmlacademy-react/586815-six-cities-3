import { OfferType } from '../../types/common';
import { createSlice } from '@reduxjs/toolkit';
import { fetchNearbyOffers } from '../thunks/nearby-offers';

interface NearbyOffersState {
  items: OfferType[];
}

const initialState: NearbyOffersState = {
  items: []
};

export const nearbyOfferSlice = createSlice({
  name: 'nearbyOffers',
  initialState,
  reducers: {
    changeFavoriteStatusInNearbyOffer(state, action) {
      const offer = state.items.find((item) => item.id === action.payload as string);
      if (offer) {
        offer.isFavorite = !offer.isFavorite;
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchNearbyOffers.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  }
});

export const nearbyOffersActions = {
  ...nearbyOfferSlice.actions,
  fetchNearbyOffers
};
