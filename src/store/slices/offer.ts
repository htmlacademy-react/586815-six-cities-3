import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../const';
import { DetailedOfferType } from '../../types/common';
import { fetchDetailedOffer } from '../thunks/offer';

interface OfferState {
  item: DetailedOfferType | null;
  status: RequestStatus;
}

const initialState: OfferState = {
  item: null,
  status: RequestStatus.Idle
};

export const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchDetailedOffer.pending, (state) => {
      state.status = RequestStatus.Loading;
    })
      .addCase(fetchDetailedOffer.fulfilled, (state, action) => {
        state.item = action.payload;
        state.status = RequestStatus.Succeeded;
      })
      .addCase(fetchDetailedOffer.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const offerActions = {
  ...offerSlice.actions,
  fetchDetailedOffer
};
