import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../const';
import { ReviewType } from '../../types/common';
import { sendReviewAction, fetchOfferReviews } from '../thunks/reviews';

interface ReviewsState {
  items: ReviewType[];
  status: RequestStatus;
}

const initialState: ReviewsState = {
  items: [],
  status: RequestStatus.Idle
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchOfferReviews.pending, (state) => {
      state.status = RequestStatus.Loading;
    })
      .addCase(fetchOfferReviews.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = RequestStatus.Succeeded;
      })
      .addCase(fetchOfferReviews.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(sendReviewAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(sendReviewAction.fulfilled, (state) => {
        state.status = RequestStatus.Succeeded;
      })
      .addCase(sendReviewAction.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const reviewsActions = {
  ...reviewsSlice.actions,
  fetchOfferReviews,
  sendReviewAction
};
