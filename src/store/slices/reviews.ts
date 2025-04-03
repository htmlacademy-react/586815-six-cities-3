import { createSlice } from '@reduxjs/toolkit';
import { ReviewType } from '../../types/common';
import { fetchOfferReviews } from '../thunks/reviews';

interface ReviewsState {
  items: ReviewType[];
}

const initialState: ReviewsState = {
  items: []
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchOfferReviews.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  }
});

export const reviewsActions = {
  ...reviewsSlice.actions,
  fetchOfferReviews
};
