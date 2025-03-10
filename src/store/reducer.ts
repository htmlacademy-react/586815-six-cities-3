import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../const';
import { changeCity, loadOffers, requireAuthorization, setError, setOffersLoadingStatus, addUserData } from './action';
import { AuthorizationStatus } from '../const';
import { State } from '../types/state';

const initialState: State = {
  city: CITIES[0],
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersLoading: false,
  user: null,
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
    });
});

export { reducer };
