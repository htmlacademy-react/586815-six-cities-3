import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../const';
import { changeCity, initialOffers } from './action';
import { AuthorizationStatus } from '../const';
import { OfferType } from '../types/common';

const initialState = {
  city: CITIES[0],
  offers: <OfferType[] | never[]>[],
  authorizationStatus: AuthorizationStatus.Auth,
  user: {},
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(initialOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export { reducer };
