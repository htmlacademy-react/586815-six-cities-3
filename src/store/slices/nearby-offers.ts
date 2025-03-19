import { OfferType } from '../../types/common';
import { RequestStatus } from '../../const';
import { createSlice } from '@reduxjs/toolkit';
import { fetchNearbyOffers } from '../thunks/nearby-offers';

interface NearbyOffersState {
  items: OfferType[];
  status: RequestStatus;
}

const initialState: NearbyOffersState = {
  items: [],
  status: RequestStatus.Idle
};

export const nearbyOfferSlice = createSlice({
  name: 'nearbyOffers',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchNearbyOffers.pending, (state) => {
      state.status = RequestStatus.Loading;
    })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = RequestStatus.Succeeded;
      })
      .addCase(fetchNearbyOffers.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const nearbyOffersActions = {
  ...nearbyOfferSlice.actions,
  fetchNearbyOffers
};
