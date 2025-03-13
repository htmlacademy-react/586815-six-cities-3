import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../const';
import { changeCity, loadOffers, requireAuthorization, setError, setOffersLoadingStatus, addUserData, loadDetailedOffer, loadOfferReviews, loadNearbyOffers } from './action';
import { AuthorizationStatus } from '../const';
import { State } from '../types/state';

const initialState: State = {
  city: CITIES[0],
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersLoading: false,
  user: null,
  detailedOffer: null,
  offerReviews: [],
  nearbyOffers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(addUserData, (state, action) => {
      state.user = action.payload;
    })
    .addCase(loadDetailedOffer, (state, action) => {
      state.detailedOffer = action.payload;
    })
    .addCase(loadOfferReviews, (state, action) => {
      state.offerReviews = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    });
});

export { reducer };
