import { createSlice } from '@reduxjs/toolkit';
import { OfferType } from '../../types/common';
import { fetchFavoritesOffers } from '../thunks/favorites';

interface FavoriteState {
  items: OfferType[];
}

const initialState: FavoriteState = {
  items: []
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchFavoritesOffers.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  }
});

export const favoriteActions = {
  ...favoritesSlice.actions,
  fetchFavoritesOffers
};
