import { combineReducers } from '@reduxjs/toolkit';
import { favoritesSlice } from './slices/favorites';
import { offersSlice } from './slices/offers';
import { reviewsSlice } from './slices/reviews';
import { nearbyOfferSlice } from './slices/nearby-offers';
import { offerSlice } from './slices/offer';
import { loadingSlice } from './slices/loading-slice';
import { userSlice } from './slices/user';

const reducer = combineReducers({
  [favoritesSlice.name]: favoritesSlice.reducer,
  [nearbyOfferSlice.name]: nearbyOfferSlice.reducer,
  [offerSlice.name]: offerSlice.reducer,
  [offersSlice.name]: offersSlice.reducer,
  [reviewsSlice.name]: reviewsSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [loadingSlice.name]: loadingSlice.reducer,
});

export { reducer };
