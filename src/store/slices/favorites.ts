import { createSlice } from '@reduxjs/toolkit';
import { OfferType } from '../../types/common';
import { changeFavorite, fetchFavoritesOffers } from '../thunks/favorites';

interface FavoriteState {
  items: OfferType[];
}

const initialState: FavoriteState = {
  items: []
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    dropFavoriteOffer(state, action) {
      state.items = state.items.filter((offer) => offer.id !== action.payload);
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchFavoritesOffers.fulfilled, (state, action) => {
      state.items = action.payload;
    })
      .addCase(changeFavorite.fulfilled, (state, action) => {
        if (!action.payload.isFavorite) {
          state.items = state.items.filter((offer) => offer.id !== action.payload.id);
          return;
        }
        state.items.push(action.payload as OfferType);
      });
  }
});

export const favoriteActions = {
  ...favoritesSlice.actions,
  fetchFavoritesOffers,
  changeFavorite
};
