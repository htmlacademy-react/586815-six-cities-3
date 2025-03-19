import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../const';
import { OfferType } from '../../types/common';
import { fetchFavoritesOffers, changeFavorite } from '../thunks/favorites';
// import { store } from '..';

interface FavoriteState {
  items: OfferType[];
  status: RequestStatus;
  isFetching: boolean;
}

const initialState: FavoriteState = {
  items: [],
  status: RequestStatus.Idle,
  isFetching: false
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    changeFetchingStatus(state, action) {
      state.isFetching = action.payload as boolean;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchFavoritesOffers.pending, (state) => {
      state.status = RequestStatus.Loading;
    })
      .addCase(fetchFavoritesOffers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = RequestStatus.Succeeded;
      })
      .addCase(fetchFavoritesOffers.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(changeFavorite.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(changeFavorite.fulfilled, (state) => {
        state.status = RequestStatus.Succeeded;
      })
      .addCase(changeFavorite.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const favoriteActions = {
  ...favoritesSlice.actions,
  changeFavorite,
  fetchFavoritesOffers
};
