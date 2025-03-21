import { combineReducers } from '@reduxjs/toolkit';
import { favoritesSlice } from './slices/favorites';
import { offersSlice } from './slices/offers';
import { reviewsSlice } from './slices/reviews';
import { nearbyOfferSlice } from './slices/nearby-offers';
import { offerSlice } from './slices/offer';
import { userSlice } from './slices/user';

const reducer = combineReducers({
  // favorites: favoritesSlice.reducer,
  // nearbyOffers: nearbyOfferSlice.reducer,
  // offer: offerSlice.reducer,
  // offers: offersSlice.reducer,
  // reviews: reviewsSlice.reducer,
  // user: userSlice.reducer,
  [favoritesSlice.name]: favoritesSlice.reducer,
  [nearbyOfferSlice.name]: nearbyOfferSlice.reducer,
  [offerSlice.name]: offerSlice.reducer,
  [offersSlice.name]: offersSlice.reducer,
  [reviewsSlice.name]: reviewsSlice.reducer,
  [userSlice.name]: userSlice.reducer,
});

export { reducer };
