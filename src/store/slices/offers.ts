import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../const';
import { OfferType } from '../../types/common';
import { fetchOffers } from '../thunks/offers';
import { CITIES } from '../../const';

interface OffersState {
  currentCity: string;
  items: OfferType[];
  status: RequestStatus;
}

const initialState: OffersState = {
  currentCity: CITIES[0],
  items: [],
  status: RequestStatus.Idle
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity(state, action) {
      state.currentCity = action.payload as string;
    },
    changeFavoriteStatus(state, action) {
      const offer = state.items.find((item) => item.id === action.payload as string);
      if (offer) {
        offer.isFavorite = !offer.isFavorite;
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchOffers.pending, (state) => {
      state.status = RequestStatus.Loading;
    })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = RequestStatus.Succeeded;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const offersActions = {
  ...offersSlice.actions,
  fetchOffers
};
