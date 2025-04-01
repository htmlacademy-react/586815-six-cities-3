import { createSlice } from '@reduxjs/toolkit';
import { DetailedOfferType } from '../../types/common';
import { fetchDetailedOffer } from '../thunks/offer';

interface OfferState {
  item: DetailedOfferType | null;
}

const initialState: OfferState = {
  item: null
};

export const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchDetailedOffer.fulfilled, (state, action) => {
      state.item = action.payload;
    });
  }
});

export const offerActions = {
  ...offerSlice.actions,
  fetchDetailedOffer
};
