import { createSlice } from '@reduxjs/toolkit';
import { OfferType } from '../../types/common';
import { fetchOffers } from '../thunks/offers';
import { CITIES } from '../../const';

interface OffersState {
  currentCity: string;
  items: OfferType[];
}

const initialState: OffersState = {
  currentCity: CITIES[0],
  items: []
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity(state, action) {
      state.currentCity = action.payload as string;
    },
    changeFavoriteStatusInMainOffer(state, action) {
      const offer = state.items.find((item) => item.id === action.payload as string);
      if (offer) {
        offer.isFavorite = !offer.isFavorite;
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchOffers.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  }
});

export const offersActions = {
  ...offersSlice.actions,
  fetchOffers
};
